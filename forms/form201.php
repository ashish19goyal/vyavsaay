<div id='form201' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form201_csv'><i class='fa fa-file-excel-o'></i> Download as CSV</a>
                    </li>
                    <li>
                      	<a id='form201_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form201_print'><i class='fa fa-print'></i> Print</a>
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
					<form id='form201_header'></form>
						<th><input type='text' placeholder="DRS #" class='floatlabel' name='drs' form='form201_header'></th>
						<th><input type='text' placeholder="Employee" class='floatlabel' name='emp' form='form201_header'></th>
						<th><input type='text' placeholder="Date" class='floatlabel' name='date' form='form201_header'></th>
						<th><input type='text' placeholder="Type" class='floatlabel' name='type' form='form201_header'></th>
						<th><input type='submit' form='form201_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form201_body'>
			</tbody>
		</table>
	</div>

    <script>

    function form201_header_ini()
    {
        var filter_fields=document.getElementById('form201_header');
        var employee_filter=filter_fields.elements['emp'];
        var date_filter=filter_fields.elements['date'];
        var type_filter=filter_fields.elements['type'];

        var employee_data={data_store:'staff',return_column:'acc_name'};

        $(filter_fields).off('submit');
        $(filter_fields).on('submit',function(event)
        {
            event.preventDefault();
            form201_ini();
        });

        set_my_filter_json(employee_data,employee_filter);
        set_static_filter_json('drs','type',type_filter);
        $(date_filter).datepicker();
    };

    function form201_ini()
    {
        show_loader();
        var fid=$("#form201_link").attr('data_id');
        if(fid==null)
            fid="";

        var filter_fields=document.getElementById('form201_header');
        var fdrs=filter_fields.elements['drs'].value;
        var femployee=filter_fields.elements['emp'].value;
        var fdate=get_raw_time(filter_fields.elements['date'].value);
        var ftype=filter_fields.elements['type'].value;

        $('#form201_body').html("");

        var type_object={index:'type'};
        if(ftype!="")
        {
            type_object={index:'type',exact:ftype};
        }

        var paginator=$('#form201_body').paginator();

        var new_columns={count:paginator.page_size(),
                         start_index:paginator.get_index(),
                         data_store:'drs',
						 access:'yes',
                         indexes:[{index:'id',value:fid},
                                {index:'drs_num',value:fdrs},
                                {index:'employee',value:femployee},
                                {index:'drs_time',value:fdate},
                                type_object,
                                {index:'collectable_amount'},
                                {index:'collected_amount'}]};

        read_json_rows('form201',new_columns,function(results)
        {
            var drs_num_array=[];
            results.forEach(function(result)
            {
                drs_num_array.push(result.drs_num);
                var detail_form='form200';
                var title='Non-COD';
                if(result.type=='COD')
                {
                    detail_form='form219';
                    title="Collectable Amount: Rs. "+result.collectable_amount+"\nCollected Amount: Rs. "+result.collected_amount;
                }
                var rowsHTML="<tr>";
                    rowsHTML+="<form id='form201_"+result.id+"'></form>";
                        rowsHTML+="<td data-th='DRS #'>";
                        rowsHTML+="<a onclick=\"element_display('"+result.id+"','"+detail_form+"');\"><input type='text' readonly='readonly' form='form201_"+result.id+"' value='"+result.drs_num+"'></a>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Employee'>";
                            rowsHTML+="<a onclick=\"show_object('staff','"+result.employee+"');\"><textarea readonly='readonly' form='form201_"+result.id+"'>"+result.employee+"</textarea></a>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='DRS Time'>";
                            rowsHTML+="<input type='text' readonly='readonly' form='form201_"+result.id+"' value='"+get_my_past_date(result.drs_time)+"'>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Type'>";
                            rowsHTML+="<input type='text' readonly='readonly' form='form201_"+result.id+"' title='"+title+"' value='"+result.type+"'>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Action'>";
                            rowsHTML+="<input type='hidden' form='form201_"+result.id+"' value='"+result.id+"' name='id'>";
                            rowsHTML+="<button type='button' class='btn red' form='form201_"+result.id+"' title='Delete order' onclick='form201_delete_item($(this));' name='delete'><i class='fa fa-trash'></i></button>";
                        rowsHTML+="</td>";
                rowsHTML+="</tr>";

                $('#form201_body').append(rowsHTML);
            });

            $('#form201').formcontrol();
			paginator.update_index(results.length);

            var columns=new Object();
                columns.data_store='logistics_orders';
                columns.indexes=[{index:'id'},
                                {index:'awb_num'},
                                {index:'drs_time'},
                                {index:'order_num'},
                                {index:'weight'},
                                {index:'pieces'},
                                {index:'status'},
                                {index:'delivery_person'},
                                {index:'manifest_type'},
                                {index:'merchant_name'},
                                {index:'phone'},
                                {index:'sku'},
                                {index:'return_address1'},
                                {index:'return_address2'},
                                {index:'return_address3'},
                                {index:'ship_to'},
                                {index:'address1'},
                                {index:'address2'},
                                {index:'address3'},
                                {index:'city'},
                                {index:'drs_num',array:drs_num_array}];

				vExport.export_buttons({action:'dynamic',columns:columns,file:'DRS Orders',report_id:'form201',feach:function (item)
                {
                    item['AWB No']=item.awb_num;
                    item['DRS No']=item.drs_num;
                    item['Order Id']=item.order_num;
                    item['Wt']=item.weight;
                    item['Pcs']=item.pieces;
                    item['status']=item.status;
                    item['Delivery Boy']=item.delivery_person;
                    item['AWB Type']=item.manifest_type;
                    item['Merchant']=item.merchant_name;
                    item['Merchant Address']=item.return_address1+", "+item.return_address2+", "+item.return_address3;
                    item['Consignee Address']=item.address1+", "+item.address2+", "+item.address3+", "+item.city;
                    item['Mobile No']=item.phone;
                    item['Product Name']=item.sku;

                    delete item.order_num;
                    delete item.awb_num;
                    delete item.weight;
                    delete item.pieces;
                    delete item.status;
                    delete item.delivery_person;
                    delete item.manifest_type;
                    delete item.merchant_name;
                    delete item.return_address1;
                    delete item.return_address2;
                    delete item.return_address3;
                    delete item.vendor_phone;
                    delete item.address1;
                    delete item.address2;
                    delete item.address3;
                    delete item.city;
                    delete item.phone;
                    delete item.sku;
                    delete item.drs_num;
                    delete item.drs_time;
                }});

            hide_loader();
        });
    };

    function form201_delete_item(button)
    {
        if(is_delete_access('form201'))
        {
            modal115_action(function()
            {
                var form_id=$(button).attr('form');
                var form=document.getElementById(form_id);

                var drs_num=form.elements[0].value;
                var data_id=form.elements[4].value;

                var data_json={data_store:'drs',
                                data:[{index:'id',value:data_id}],
                                log:'yes',
                                log_data:{title:"Deleted",notes:"DRS # "+drs_num,link_to:"form266"}};
                delete_json(data_json);

                var drs_items_xml={data_store:'logistics_orders',return_column:'id',
                                  indexes:[{index:'status',exact:'out for delivery'},
                                          {index:'drs_num',exact:drs_num}]};
                read_json_single_column(drs_items_xml,function(drs_items)
                {
                    var data_json={data_store:'logsistics_orders',
                                    loader:'yes',
                                    data:[]};

                    var counter=1;
                    var last_updated=get_my_time();

                    drs_items.forEach(function(row)
                    {
                        var data_json_array=[{index:'id',value:row},
                                        {index:'drs_num',value:''},
                                        {index:'drs_id',value:''},
                                        {index:'status',value:'pending'},
                                        {index:'last_updated',value:last_updated}];
                        data_json.data.push(data_json_array);
                    });
                    update_batch_json(data_json);
                });
                $(button).parent().parent().remove();
            });
        }
        else
        {
            $("#modal2_link").click();
        }
    }

    </script>
</div>
