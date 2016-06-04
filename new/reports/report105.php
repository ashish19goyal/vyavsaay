<div id='report105' class='tab-pane portlet box red-sunglo'>	   
	<div class="portlet-title">
		<div class='caption'>		
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='report105_ini();'>Refresh</a>
		</div>		
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='report105_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                        <a id='report105_email'><i class='fa fa-envelope'></i> Email</a>
                    </li>
                </ul>
            </div>
        </div>	
	</div>
	
	<div class="portlet-body">
		<form id='report105_header' autocomplete="off">
			<fieldset>
				<label><input type='text' placeholder="Upto Date" class='floatlabel' name='end'></label>
				<label><input type='submit' class='submit_hidden'></label>			
			</fieldset>
		</form>
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<th>AWB #</th>
                    <th>Product</th>
                    <th>Import Date</th>
                    <th>Status</th>
                </tr>
			</thead>
			<tbody id='report105_body'></tbody>
		</table>
	</div>
	
	<script>

    function report105_header_ini()
    {	
        var form=document.getElementById('report105_header');
        var end_filter=form.elements['end'];

        $(form).off('submit');
        $(form).on('submit',function(event)
        {
            event.preventDefault();
            report105_ini();
        });

        $(end_filter).datepicker();
        end_filter.value=vTime.date();
        
        $('#report105').formcontrol();
    }

    function report105_ini()
    {
        var form=document.getElementById('report105_header');
        var end_filter=get_raw_time(form.elements['end'].value)+86399999;
        
        show_loader();
        $('#report105_body').html('');	

        //access control is to be implemented based on store areas
        //the user should could be an owner of the branch to which this order belongs
        
        var paginator=$('#report105_body').paginator({'page_size':25});
        
        var columns={count:paginator.page_size(),
                    start_index:paginator.get_index(),
                    data_store:'logistics_orders',
                    indexes:[{index:'id'},
                        {index:'awb_num'},
                        {index:'import_date',upperbound:end_filter},
                        {index:'order_num'},
                        {index:'weight'},
                        {index:'pieces'},
                        {index:'status',array:['received','pending','undelivered','RTO pending']},
                        {index:'channel_name'},
                        {index:'manifest_type'},
                        {index:'merchant_name'},
                        {index:'phone'},
                        {index:'sku'},
                        {index:'delivery_person'},
                        {index:'collectable_value'},
                        {index:'ship_to'},
                        {index:'address1'},
                        {index:'address2'},
                        {index:'address3'},
                        {index:'city'},
                        {index:'pincode'},     
                        {index:'return_address1'},
                        {index:'return_address2'},
                        {index:'return_address3'}]};		
        
        read_json_rows('report105',columns,function(items)
        {
            //console.log(items);
            var rowsHTML="";
            items.forEach(function(item)
            {
                rowsHTML+="<tr>";
                rowsHTML+="<form id='report105_"+item.id+"'></form>";
                rowsHTML+="<td data-th='AWB #'>";
				    rowsHTML+="<a onclick=\"element_display('','form198');form198_ini('"+item.awb_num+"');\">"+item.awb_num+"</a>";
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Product'>";
                    rowsHTML+=item.sku;
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Date'>";
                    rowsHTML+=get_my_past_date(item.import_date);
                rowsHTML+="</td>";
                rowsHTML+="<td data-th='Status'>";
                    rowsHTML+=item.status;
                rowsHTML+="</td>";
                rowsHTML+="</tr>";

            });
            $('#report105_body').append(rowsHTML);
            
            initialize_tabular_report_buttons(columns,'Stock Report','report105',function (item)
            {
                item['AWB No']=item.awb_num;
                item['Order Id']=item.order_num;
                item['Import Date']=get_my_past_date(item.import_date);
                item['Channel']=item.channel_name;
                item['Status']=item.status;
                item['Wt']=item.weight;
                item['Pcs']=item.pieces;
                item['COD Amount']=item.collectable_value;
                item['Delivery Boy']=item.delivery_person;
                item['AWB Type']=item.manifest_type;
                item['Customer Name']=item.merchant_name;
                item['Address']=item.return_address1+", "+item.return_address2+", "+item.return_address3;
                item['Consignee Name']=item.ship_to;
                item['Consignee Address']=item.address1+", "+item.address2+", "+item.address3;
                item['City']=item.city;
                item['Pincode']=item.pincode;
                item['Mobile No']=item.phone;
                item['Product Name']=item.sku;
             
                delete item.id;
                delete item.awb_num;
                delete item.import_date;
                delete item.order_num;
                delete item.weight;
                delete item.pieces;
                delete item.status;
                delete item.channel_name;
                delete item.manifest_type;
                delete item.merchant_name;
                delete item.phone;
                delete item.sku;
                delete item.delivery_person;
                delete item.collectable_value;
                delete item.ship_to;
                delete item.address1;
                delete item.address2;
                delete item.address3;
                delete item.city;
                delete item.pincode;     
                delete item.return_address1;
                delete item.return_address2;
                delete item.return_address3;
            });

            paginator.update_index(items.length);
            hide_loader();
        });
    };
	
	</script>
</div>