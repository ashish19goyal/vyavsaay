<div id='report89' class='tab-pane portlet box red-sunglo'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='report89_ini();'>Refresh</a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='report89_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                        <a id='report89_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li>
                        <a id='report89_email'><i class='fa fa-envelope'></i> Email</a>
                    </li>
                </ul>
            </div>
        </div>
	</div>

	<div class="portlet-body">
		<form id='report89_header' autocomplete="off">
			<fieldset>
				<label><input type='text' placeholder="Delivery Person" class='floatlabel' name='person'></label>
                <label><input type='text' placeholder="Import Start Date" class='floatlabel' name='start'></label>
                <label><input type='text' placeholder="Import End Date" class='floatlabel' name='end'></label>
				<label><input type='submit' class='submit_hidden'></label>
			</fieldset>
		</form>
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<th>Person</th>
                    <th>AWB #</th>
                    <th>Import Date</th>
                    <th>Delivery Date</th>
                </tr>
			</thead>
			<tbody id='report89_body'></tbody>
		</table>
	</div>

	<script>

function report89_header_ini()
{
	var form=document.getElementById('report89_header');
	var person_filter=form.elements['person'];
	var start_filter=form.elements['start'];
	var end_filter=form.elements['end'];

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report89_ini();
	});

	var person_data={data_store:'staff',return_column:'acc_name'};
	set_my_filter_json(person_data,person_filter);

	$(start_filter).datepicker();
	$(end_filter).datepicker();
	start_filter.value=get_my_past_date(get_my_time()-7*86400000);
	end_filter.value=vTime.date();

    $('#report89').formcontrol();
}

function report89_ini()
{
	show_loader();
	var form=document.getElementById('report89_header');
	var person=form.elements['person'].value;
	var start_date=get_raw_time(form.elements['start'].value);
	var end_date=get_raw_time(form.elements['end'].value)+86399999;

	$('#report89_body').html('');

	var paginator=$('#report89_body').paginator({'page_size':25});

    var columns={count:paginator.page_size(),
                start_index:paginator.get_index(),
                data_store:'logistics_orders',
                indexes:[{index:'id'},
                         {index:'awb_num'},
						{index:'import_date',lowerbound:start_date,upperbound:end_date},
						{index:'order_num'},
						{index:'status',exact:'delivered'},
						{index:'delivery_person',value:person},
						{index:'manifest_type'},
						{index:'merchant_name'},
						{index:'phone'},
						{index:'sku'},
						{index:'return_address1'},
						{index:'return_address2'},
						{index:'return_address3'},
						{index:'order_history'}]};

		read_json_rows('report89',columns,function(deliveries)
		{
			deliveries.forEach(function(result)
			{
				result.delivery_date="NA";
				var order_history_object=vUtil.jsonParse(result.order_history);
				for(var i in order_history_object)
				{
					if(order_history_object[i].status=='delivered')
					{
						result.delivery_date=get_my_past_date(order_history_object[i].timeStamp);
						break;
					}
				}

				var rowsHTML="<tr>";
					rowsHTML+="<td data-th='Person'><a onclick=\"show_object('staff','"+result.delivery_person+"');\">";
						rowsHTML+=result.delivery_person;
					rowsHTML+="</a></td>";
					rowsHTML+="<td data-th='AWB #'>";
						rowsHTML+=result.awb_num;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Date'>";
						rowsHTML+=get_my_past_date(result.import_date);
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Delivery Date'>";
						rowsHTML+=result.delivery_date;
					rowsHTML+="</td>";
				rowsHTML+="</tr>";

				$('#report89_body').append(rowsHTML);
			});

			vExport.export_buttons({action:'dynamic',columns:columns,file:'Deliveries (by person)',report_id:'report89',feach:function (item)
			{
                item['AWB No']=item.awb_num;
                item['Order Id']=item.order_num;
                item['Import Date']=get_my_past_date(item.import_date);
                item['Status']=item.status;
                item['AWB Type']=item.manifest_type;
                item['Delivery Boy']=item.delivery_person;
                item['AWB Type']=item.manifest_type;
                item['Merchant']=item.merchant_name;
                item['Merchant Address']=item.return_address1+", "+item.return_address2+", "+item.return_address3;
                item['Mobile No']=item.phone;
                item['Product Name']=item.sku;

                delete item.id;
                delete item.awb_num;
                delete item.import_date;
                delete item.order_num;
                delete item.status;
                delete item.manifest_type;
                delete item.merchant_name;
                delete item.phone;
                delete item.sku;
                delete item.delivery_person;
                delete item.return_address1;
                delete item.return_address2;
                delete item.return_address3;
            }});

            paginator.update_index(deliveries.length);
            hide_loader();
		});

};

	</script>
</div>
