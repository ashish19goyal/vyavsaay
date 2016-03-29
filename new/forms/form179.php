<div id='form179' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form179_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form179_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form179_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li class="divider"> </li>
                    <li>
                        <a id='form179_upload' onclick=modal23_action(form179_import_template,form179_import,form179_import_validate);><i class='fa fa-upload'></i> Import</a>
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
					<form id='form179_header'></form>
						<th><input type='text' placeholder="Order #" class='floatlabel' name='order' form='form179_header'></th>
						<th><input type='text' placeholder="Date" readonly='readonly' name='date' form='form179_header'></th>
						<th><input type='text' placeholder="Score" readonly='readonly' name='score' form='form179_header'></th>
						<th><input type='text' placeholder="Supplier" class='floatlabel' name='supplier' form='form179_header'></th>
						<th><input type='text' placeholder="Status" class='floatlabel' name='status' form='form179_header'></th>
						<th><input type='submit' form='form179_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form179_body'>
			</tbody>
		</table>
	</div>

    <script>
        function form179_header_ini()
        {
            var filter_fields=document.getElementById('form179_header');
            var order_filter=filter_fields.elements['order'];
            var name_filter=filter_fields.elements['supplier'];
            var status_filter=filter_fields.elements['status'];

            var order_data={data_store:'purchase_orders',return_column:'order_num'};
            var name_data={data_store:'suppliers',return_column:'acc_name'};

            $(filter_fields).off('submit');
            $(filter_fields).on('submit',function(event)
            {
                event.preventDefault();
                form179_ini();
            });

            set_my_filter_json(order_data,order_filter);
            set_my_filter_json(name_data,name_filter);
            set_static_filter_json('purchase_orders','status',status_filter);
        };

        function form179_ini()
        {
            show_loader();
            var fid=$("#form179_link").attr('data_id');
            if(fid==null)
                fid="";	

            $('#form179_body').html("");

            var filter_fields=document.getElementById('form179_header');
            var fnum=filter_fields.elements['order'].value;
            var fname=filter_fields.elements['supplier'].value;
            var fstatus=filter_fields.elements['status'].value;
            
            var paginator=$('#form179_body').paginator();
			
			var columns=new Object();
					columns.count=paginator.page_size();
					columns.start_index=paginator.get_index();
					columns.data_store='purchase_orders';

					columns.indexes=[{index:'id',value:fid},
									{index:'order_num',value:fnum},
									{index:'supplier',value:fname},
									{index:'order_date'},
                                    {index:'priority'},
                                    {index:'bill_id'}, 
									{index:'status',value:fstatus}];
			
            read_json_rows('form179',columns,function(results)
            {	
                results.forEach(function(result)
                {
                    var rowsHTML="<tr>";
                        rowsHTML+="<form id='form179_"+result.id+"'></form>";
                            rowsHTML+="<td data-th='Order #'>";
                                rowsHTML+="<a onclick=\"element_display('"+result.id+"','form178');\"><input type='text' readonly='readonly' name='order' form='form179_"+result.id+"' value='"+result.order_num+"'></a>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Order Date'>";
                                rowsHTML+="<input type='text' name='date' readonly='readonly' form='form179_"+result.id+"' value='"+get_my_past_date(result.order_date)+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Score'>";
                                rowsHTML+="<textarea readonly='readonly' name='score' form='form179_"+result.id+"'>"+result.priority+"</textarea>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Supplier'>";
                            if(result.supplier!='')
                            {					
                                rowsHTML+="<a onclick=\"show_object('suppliers','"+result.supplier+"');\"><input type='text' readonly='readonly' name='supplier' form='form179_"+result.id+"' value='"+result.supplier+"'></a>";
                            }
                            else
                            {					
                                rowsHTML+="<button type='button' name='assign_supplier' class='btn default purple-stripe' form='form179_"+result.id+"' onclick=\"modal126_action('"+result.id+"','"+result.order_num+"');\">Assign</button>";
                            }	
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Status'>";
                                rowsHTML+="<input type='text' readonly='readonly' name='status' class='dblclick_editable' form='form179_"+result.id+"' value='"+result.status+"'>";
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Action'>";
                                rowsHTML+="<input type='hidden' form='form179_"+result.id+"' name='id' value='"+result.id+"'>";
                                rowsHTML+="<button type='submit' class='btn green' name='save' form='form179_"+result.id+"' title='Save order'><i class='fa fa-save'></i></button>";
                                rowsHTML+="<button type='button' class='btn red' form='form179_"+result.id+"' title='Delete order' name='delete' onclick='form179_delete_item($(this));'><i class='fa fa-trash'></i></button>";
                            if(result.bill_id!='' && result.bill_id!='null' && result.bill_id!=null)
                            {
                                rowsHTML+="<button type='button' name='view_bill' class='btn default yellow-stripe' form='form179_"+result.id+"'>View Bill</button>";
                            }
                            else
                            {
                                rowsHTML+="<button type='button' name='issue_grn' class='btn default green-stripe' form='form179_"+result.id+"'>Issue GRN</button>";
                            }
                            rowsHTML+="</td>";
                    rowsHTML+="</tr>";

                    $('#form179_body').append(rowsHTML);
                    var fields=document.getElementById("form179_"+result.id);
                    var supplier_filter=fields.elements['supplier'];
                    var status_filter=fields.elements['status'];

                    set_static_value_list_json('purchase_orders','status',status_filter);

                    $(fields).on("submit",function(event)
                    {
                        event.preventDefault();
                        form179_update_item(fields);
                    });

                    var issue_button=fields.elements['issue_grn'];
                    $(issue_button).on('click',function()
                    {
                        element_display('','form136');
                        var master_form=document.getElementById('form136_master');
                        master_form.elements['supplier'].value=result.supplier;
                        master_form.elements['po_num'].value=result.order_num;
                        master_form.elements['order_id'].value=result.id;
                        $(master_form.elements['bill_num']).focus();
                        $('#form136').formcontrol();
                    });


                    var view_button=fields.elements['view_bill'];
                    $(view_button).on('click',function()
                    {
                        modal137_action(result.bill_id);
                        //element_display(result.bill_id,'form122');
                    });	
                });

                $('#form179').formcontrol();
				paginator.update_index(results.length);
				initialize_tabular_report_buttons(columns,'Purchase Orders','form179',function (item)
                {
                    item.order_date=get_my_past_date(item.order_date);
                });
				hide_loader();
            });
        };

        function form179_update_item(form)
        {
            if(is_update_access('form179'))
            {
                var order_num=form.elements['order'].value;
                var order_date=get_raw_time(form.elements['date'].value);
                var priority=form.elements['score'].value;
                var supplier_name=form.elements['supplier'].value;
                var status=form.elements['status'].value;
                var data_id=form.elements['id'].value;
                var last_updated=get_my_time();
                
                var data_json={data_store:'purchase_orders',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'order_date',value:order_date},
	 					{index:'status',value:status},
	 					{index:'order_num',value:order_num},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Updated',notes:'Purchase order # '+order_num,link_to:'form179'}};
 				
                update_json(data_json);
                $(form).readonly();
            }
            else
            {
                $("#modal2_link").click();
            }
        }

        function form179_delete_item(button)
        {
            if(is_delete_access('form179'))
            {
                modal115_action(function()
                {
                    var form_id=$(button).attr('form');
                    var form=document.getElementById(form_id);

                    var order_num=form.elements['order'].value;
                    var data_id=form.elements['id'].value;
                    var last_updated=get_my_time();
                    
                    var data_json={data_store:'purchase_orders',
                        log:'yes',
                        data:[{index:'id',value:data_id}],
                        log_data:{title:'Deleted',notes:'Purchase order # '+order_num,link_to:'form179'}};
 				
                    var other_json={data_store:'purchase_order_items',
                        data:[{index:'order_id',value:data_id}]};

                    delete_json(data_json);
                    delete_json(other_json);
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