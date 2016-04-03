<div id='form269' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form269_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form269_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form269_print'><i class='fa fa-print'></i> Print</a>
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
					<form id='form269_header'></form>
						<th><input type='text' placeholder="Challan #" class='floatlabel' name='challan' form='form269_header'></th>
						<th><input type='text' placeholder="Customer" class='floatlabel' name='cust' form='form269_header'></th>
						<th><input type='text' placeholder="Date" readonly='readonly' form='form269_header'></th>
						<th><input type='text' placeholder="Details" readonly="readonly" form='form269_header'></th>
						<th><input type='submit' form='form269_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form269_body'>
			</tbody>
		</table>
	</div>


    <script>
    
        function form269_header_ini()
        {
            var filter_fields=document.getElementById('form269_header');
            var challan_filter=filter_fields.elements['challan'];
            var cust_filter=filter_fields.elements['cust'];
            
            $(filter_fields).off('submit');
            $(filter_fields).on('submit',function(event)
            {
                event.preventDefault();
                form269_ini();
            });

            var challan_data={data_store:'delivery_challans',return_column:'challan_num'};
            var cust_data={data_store:'customers',return_column:'acc_name'};
            set_my_filter_json(challan_data,challan_filter);
            set_my_filter_json(cust_data,cust_filter);    
        };

        function form269_ini()
        {
            show_loader();
            var fid=$("#form269_link").attr('data_id');
            if(fid==null)
                fid="";

            $('#form269_body').html("");

            var filter_fields=document.getElementById('form269_header');
            var fchallan=filter_fields.elements['challan'].value;
            var fname=filter_fields.elements['cust'].value;
            
            var paginator=$('#form269_body').paginator();
			
			var new_columns=new Object();
                new_columns.count=paginator.page_size();
				new_columns.start_index=paginator.get_index();
				new_columns.data_store='delivery_challans';
                new_columns.indexes=[{index:'id',value:fid},
                                    {index:'challan_num',value:fchallan},
                                    {index:'customer',value:fname},
                                    {index:'challan_date'},
                                    {index:'type'},
                                    {index:'awb_num'},
                                    {index:'vehicle_num'},
                                    {index:'prepared_by'}];
            
            read_json_rows('form269',new_columns,function(results)
            {	
                results.forEach(function(result)
                {
                    var details="Type: "+result.type+"\nPrepared By: "+result.prepared_by+"\nAWB #: "+result.awb_num+"\nVehicle #: "+result.vehicle_num;
                    var rowsHTML="<tr>";
                        rowsHTML+="<form id='form269_"+result.id+"'></form>";
                            rowsHTML+="<td data-th='Challan #'>";
                                rowsHTML+="<a onclick=\"element_display('"+result.id+"','form268');\"><input type='text' readonly='readonly' form='form269_"+result.id+"' value='"+result.challan_num+"'></a>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Customer'>";
                                rowsHTML+="<a onclick=\"show_object('customers','"+result.customer+"');\"><textarea readonly='readonly' form='form269_"+result.id+"'>"+result.customer+"</textarea>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Date'>";
                                rowsHTML+="<input type='text' readonly='readonly' form='form269_"+result.id+"' value='"+get_my_past_date(result.challan_date)+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Details'>";
                                rowsHTML+="<textarea readonly='readonly' form='form269_"+result.id+"'>"+details+"</textarea>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Action'>";
                                rowsHTML+="<input type='hidden' form='form269_"+result.id+"' value='"+result.id+"'>";
                                rowsHTML+="<button type='button' class='delete_icon' form='form269_"+result.id+"' title='Delete Challan' onclick='form269_delete_item($(this));'><i class='fa fa-trash'></i></button>";
                            rowsHTML+="</td>";			
                    rowsHTML+="</tr>";

                    $('#form269_body').append(rowsHTML);
                });

                $('#form269').formcontrol();
				paginator.update_index(results.length);
				initialize_tabular_report_buttons(new_columns,'Delivery Challans','form269',function (item)
                {
                    item['challan date']=get_my_past_date(item.challan_date);
                    item['awb #']=get_my_past_date(item.awb_num);
                    item['vehicle #']=get_my_past_date(item.vehicle_num);
                    item['prepared by']=get_my_past_date(item.prepared_by);
                    
                    delete item.challan_date;
                    delete item.awb_num;
                    delete item.vehicle_num;
                    delete item.prepared_by;
                });
				hide_loader();
            });
        }

        function form269_delete_item(button)
        {
            if(is_delete_access('form269'))
            {
                modal115_action(function()
                {
                    var form_id=$(button).attr('form');
                    var form=document.getElementById(form_id);
                    var challan_num=form.elements[0].value;
                    var data_id=form.elements[4].value;
                    
                    var data_json={data_store:'delivery_challans',
                        log:'yes',
                        data:[{index:'id',value:data_id}],
                        log_data:{title:"Deleted",notes:"Challan # "+challan_num,link_to:"form269"}};

                    var item_json={data_store:'delivery_challan_items',
                        data:[{index:'challan_id',value:data_id}]};

                    var inventory_json={data_store:'inventory_adjust',
                                        data:[{index:'source_id',value:data_id},
                                              {index:'source',value:'delivery challan'}]};

                    delete_json(data_json);
                    delete_json(item_json);
                    delete_json(inventory_json);

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