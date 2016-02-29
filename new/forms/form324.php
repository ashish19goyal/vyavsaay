<div id='form324' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form324_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form324_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form324_print'><i class='fa fa-print'></i> Print</a>
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
					<form id='form324_header'></form>
                    <th><input type='text' placeholder="Challan #" class='floatlabel' name='challan' form='form324_header'></th>
                    <th><input type='text' placeholder="Customer" class='floatlabel' name='customer' form='form324_header'></th>
                    <th><input type='text' placeholder="Date" readonly='readonly' form='form324_header'></th>
                    <th><input type='text' placeholder="Quantity" readonly='readonly' form='form324_header'></th>
                    <th><input type='submit' form='form324_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form324_body'>
			</tbody>
		</table>
	</div>

    <script>
    
    function form324_header_ini()
        {
            //console.log('324_header');
            var filter_fields=document.getElementById('form324_header');
            var challan_filter=filter_fields.elements['challan'];
            var name_filter=filter_fields.elements['customer'];

            var challan_data={data_store:'delivery_challans',return_column:'challan_num'};
            var cust_data={data_store:'customers',return_column:'acc_name'};

            set_my_filter_json(challan_data,challan_filter);
            set_my_filter_json(cust_data,name_filter);

            $(filter_fields).off('submit');
            $(filter_fields).on('submit',function(event)
            {
                event.preventDefault();
                form324_ini();
            });
        };

        function form324_ini()
        {
            show_loader();
            var fid=$("#form324_link").attr('data_id');
            if(fid==null)
                fid="";	

            $('#form324_body').html("");

            var filter_fields=document.getElementById('form324_header');
            var fnum=filter_fields.elements['challan'].value;
            var fname=filter_fields.elements['customer'].value;

            var paginator=$('#form324_body').paginator();
			
			var columns=new Object();
					columns.count=paginator.page_size();
					columns.start_index=paginator.get_index();
					columns.data_store='delivery_challans';

					columns.indexes=[{index:'id',value:fid},
									{index:'challan_num',value:fnum},
									{index:'customer',value:fname},
									{index:'challan_date'},
                                    {index:'total_quantity'},
                                    {index:'order_id'}];
			
            read_json_rows('form324',columns,function(results)
            {	
                results.forEach(function(result)
                {
                    var cancelled_challan="";
                    if(result.status=='cancelled')
                    {
                        cancelled_challan="style='opacity:0.5' title='This challan was cancelled'";
                    }	
                    var rowsHTML="<tr "+cancelled_challan+">";
                        rowsHTML+="<form id='form324_"+result.id+"'></form>";
                            rowsHTML+="<td data-th='Challan #'>";
                                rowsHTML+="<a><input type='text' readonly='readonly' form='form324_"+result.id+"' value='"+result.challan_num+"'></a>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Customer'>";
                                rowsHTML+="<a onclick=\"show_object('customers','"+result.customer+"');\"><textarea readonly='readonly' form='form324_"+result.id+"'>"+result.customer+"</textarea>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Date'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form324_"+result.id+"' value='"+get_my_past_date(result.challan_date)+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Quantity'>";
                                rowsHTML+="<input type='number' readonly='readonly' form='form324_"+result.id+"' value='"+result.total_quantity+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Action'>";
                                rowsHTML+="<input type='hidden' form='form324_"+result.id+"' value='"+result.id+"'>";
                            if(result.status!='cancelled')
                            {					
                                rowsHTML+="<button type='button' class='btn red' form='form324_"+result.id+"' title='Cancel challan' onclick='form324_delete_item($(this));'><i class='fa fa-trash'></i></button>";
                            }					
                                rowsHTML+="<input type='hidden' form='form324_"+result.id+"' value='"+result.order_id+"' name='order_id'>";
                            rowsHTML+="</td>";			
                    rowsHTML+="</tr>";

                    $('#form324_body').append(rowsHTML);
                    if(result.status!='cancelled')
                    {
                        var fields=document.getElementById('form324_'+result.id);
                        var challan_num=fields.elements[0];
                        $(challan_num).parent().on('click',function()
                        {
                            element_display(result.id,'form323');
                        });
                    }
                });

                $('#form324').formcontrol();
				paginator.update_index(results.length);
				initialize_tabular_report_buttons(columns,'Delivery Challans','form324',function (item)
                {
                    delete item.order_id;
                    item.challan_date=get_my_past_date(item.challan_date);
                });
				hide_loader();
            });
        }

        function form324_delete_item(button)
        {
            if(is_delete_access('form324'))
            {
                modal115_action(function()
                {
                    var form_id=$(button).attr('form');
                    var form=document.getElementById(form_id);

                    var challan_filter=form.elements[0];
                    var challan_num=form.elements[0].value;
                    var customer_name=form.elements[1].value;
                    var data_id=form.elements[4].value;
                    var order_id=form.elements['order_id'].value;
                    var last_updated=get_my_time();
                    
                    var challan_json={data_store:'delivery_challans',
	 				log:'yes',
	 				data:[{index:'id',value:data_id}],
	 				log_data:{title:'Deleted',notes:'challan # '+challan_num,link_to:'form324'}};
 				
                    delete_json(challan_json);
                    
                    $(button).parent().parent().remove();

                    var items_json={data_store:'delivery_challan_items',
                                data:[{index:'challan_id',value:data_id}]};
                    delete_json(items_json);
                    
                    var adjust_json={data_store:'inventory_adjust',
                                data:[{index:'source_id',value:data_id},{index:'source',value:'delivery challan'}]};
                    delete_json(adjust_json);

                    //////////////////////////////////////////////
                    var sale_order_xml={data_store:'sale_orders',
                                       indexes:[{index:'id',value:order_id},
                                               {index:'challan_info'}]};
                    read_json_rows('',sale_order_xml,function (sorders) 
                    {
                        if(sorders.length>0)
                        {
                            var id_object_array=[];
                            if(sorders[0].challan_info!="" && sorders[0].challan_info!=0 && sorders[0].challan_info!="null")
                            {
                                id_object_array=JSON.parse(sorders[0].challan_info);
                            }

                            for(var k in id_object_array)
                            {
                                if(id_object_array[k].challan_info==data_id)
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

                            var new_challan_id=JSON.stringify(id_object_array);
                            var so_json={data_store:'sale_orders',
                            data:[{index:'id',value:order_id},
                                {index:'challan_id',value:new_challan_id},
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