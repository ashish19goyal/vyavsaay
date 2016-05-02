<div id='form203' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">
		<div class='caption'>		
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='modal128_action();'>Add <i class='fa fa-plus'></i></a>
		</div>
        <div class="actions">
      	    <a class='btn btn-default btn-sm' id='form203_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
            <a class='btn btn-default btn-sm' id='form203_upload' onclick=modal149_action();><i class='fa fa-upload'></i> Import</a>    
        </div>	
	</div>
	
	<div class="portlet-body">
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<form id='form203_header'></form>
						<th><input type='text' placeholder="AWB #" class='floatlabel' name='awb' form='form203_header'></th>
						<th><input type='text' placeholder="Order #" class='floatlabel' name='order' form='form203_header'></th>
						<th><input type='text' placeholder="Customer" class='floatlabel' name='customer' form='form203_header'></th>
						<th><input type='text' placeholder="Date" class='floatlabel' name='date' form='form203_header'></th>
						<th><input type='text' placeholder="Type" readonly='readonly' form='form203_header'></th>
						<th><input type='text' placeholder="Status" class='floatlabel' name='status' form='form203_header'></th>
						<th><input type='submit' form='form203_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form203_body'>
			</tbody>
		</table>
	</div>
    
    <script>
    
    function form203_header_ini()
    {
        var filter_fields=document.getElementById('form203_header');
        var awb_filter=filter_fields.elements['awb'];
        var date_filter=filter_fields.elements['date'];
        var status_filter=filter_fields.elements['status'];

        $(filter_fields).off('submit');
        $(filter_fields).on('submit',function(event)
        {
            event.preventDefault();
            form203_ini();
        });

        $(awb_filter).on('click',function()
        {
            this.select();
        });

        set_static_filter_json('logistics_orders','status',status_filter);
        $(date_filter).datepicker();
    };

    function form203_ini()
    {
        show_loader();
        var fid=$("#form203_link").attr('data_id');
        if(fid==null)
            fid="";	

        $('#form203_body').html("");
        
        var filter_fields=document.getElementById('form203_header');
        var fawb=filter_fields.elements['awb'].value;
        var forder=filter_fields.elements['order'].value;
        var fdate=get_raw_time(filter_fields.elements['date'].value);
        var fstatus=filter_fields.elements['status'].value;

        var awb_object={index:'awb_num'};
        var status_object={index:'status'};
        if(fawb!="")
        {
            awb_object={index:'awb_num',exact:fawb};
        }
        if(fstatus!="")
        {
            status_object={index:'status',exact:fstatus};
        }


        var paginator=$('#form203_body').paginator();
			
        var new_columns={count:paginator.page_size(),
                        start_index:paginator.get_index(),
                        data_store:'logistics_orders',
                        indexes:[{index:'id',value:fid},
                                {index:'order_num',value:forder},
                                {index:'merchant_name'},
                                {index:'ship_to'},
                                {index:'import_date',value:fdate},
                                {index:'type'},
                                {index:'manifest_type'},
                                {index:'branch'},
                                status_object,
                                awb_object]};

        read_json_rows('form203',new_columns,function(results)
        {	
            results.forEach(function(result)
            {
                var rowsHTML="<tr>";
                    rowsHTML+="<form id='form203_"+result.id+"'></form>";
                        rowsHTML+="<td data-th='AWB #'>";
                            rowsHTML+="<a onclick=\"element_display('"+result.id+"','form198');\"><input type='text' readonly='readonly' form='form203_"+result.id+"' value='"+result.awb_num+"'></a>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Order #'>";
                            rowsHTML+=result.order_num;
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Customer'>";
                            rowsHTML+="<input type='text' class='floatlabel' readonly='readonly' value='"+ result.merchant_name+"' placeholder='Merchant'>";
                            rowsHTML+="<input type='text' class='floatlabel' readonly='readonly' value='"+ result.ship_to+"' placeholder='Ship To'>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Date'>";
                            rowsHTML+=get_my_past_date(result.import_date);
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Type'>";
                            rowsHTML+="<input type='text' class='floatlabel' readonly='readonly' value='"+result.type+"' placeholder='AWB Type'>";
                            rowsHTML+="<input type='text' class='floatlabel' readonly='readonly' value='"+result.manifest_type+"' placeholder='Manifest Type'>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Status'>";
                            rowsHTML+="<input type='text' readonly='readonly' form='form203_"+result.id+"' value='"+result.status+"'>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Action'>";
                            rowsHTML+="<input type='hidden' form='form203_"+result.id+"' value='"+result.id+"' name='id'>";
                            rowsHTML+="<button type='button' class='btn red' form='form203_"+result.id+"' title='Delete order' onclick='form203_delete_item($(this));' name='delete'><i class='fa fa-trash'></i></button>";
                        rowsHTML+="</td>";			
                rowsHTML+="</tr>";

                $('#form203_body').append(rowsHTML);
            });

            $('#form203').formcontrol();
            paginator.update_index(results.length);
            initialize_tabular_report_buttons(new_columns,'Orders List','form203',function (item)
            {
                item['import date']=get_my_past_date(item.import_date);
                delete item.import_date;
            });
            hide_loader();
        });
    };

    function form203_delete_item(button)
    {
        if(is_delete_access('form203'))
        {
            modal115_action(function()
            {
                var form_id=$(button).attr('form');
                var form=document.getElementById(form_id);

                var awb_num=form.elements[0].value;
                var data_id=form.elements['id'].value;
                var last_updated=get_my_time();
                
                var data_json={data_store:'logistics_orders',
	 					log:'yes',
	 					data:[{index:'id',value:data_id}],
	 					log_data:{title:'Deleted',notes:'AWB # '+awb_num,link_to:'form203'}};
					
                delete_json(data_json);
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