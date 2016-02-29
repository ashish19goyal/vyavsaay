<div id='report82' class='tab-pane portlet box red-sunglo'>	   
	<div class="portlet-title">
		<div class='caption'>		
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='report82_ini();'>Refresh</a>
		</div>		
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                      	<a id='report82_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='report82_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='report82_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li>
                        <a id='report82_email'><i class='fa fa-envelope'></i> Email</a>
                    </li>
                </ul>
            </div>
        </div>	
	</div>

	<div class="portlet-body">
		<form id='report82_header' autocomplete="off">
			<fieldset>
				<label><input type='text' placeholder="Item" class='floatlabel' name='item_name'></label>
				<input type='submit' class='submit_hidden'>
            </fieldset>
		</form>
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<th>Item</th>
					<th>Total Inventory</th>
					<th>Pending Order</th>
					<th>Available Inventory</th>
				</tr>
			</thead>
			<tbody id='report82_body'>
			</tbody>
		</table>
	</div>
	
	<script>

        function report82_header_ini()
        {	
            var form=document.getElementById('report82_header');
            var product_filter=form.elements['item_name'];

            $(form).off('submit');
            $(form).on('submit',function(event)
            {
                event.preventDefault();
                report82_ini();
            });

            var product_data={data_store:'product_master',return_column:'name'};
            set_my_filter_json(product_data,product_filter);
        }

        function report82_ini()
        {
            var form=document.getElementById('report82_header');
            var item_filter=form.elements['item_name'].value;

            show_loader();
            $('#report82_body').html('');	

            var paginator=$('#report69_body').paginator();
			var columns=new Object();
			columns.count=paginator.page_size();
			columns.start_index=paginator.get_index();
			columns.data_store='product_master';
					
			columns.indexes=[{index:'id'},
							{index:'name',value:item_filter}];
	        
            read_json_rows('report82',columns,function(items)
            {
                items.forEach(function(item)
                {
                    var rowsHTML="<tr>";
                    rowsHTML+="<form id='report82_"+item.id+"'></form>";
                    rowsHTML+="<td data-th='Item'><a onclick=\"show_object('product_master','"+item.name+"');\">";
                        rowsHTML+=item.name;
                    rowsHTML+="</a></td>";
                    rowsHTML+="<td data-th='Total Inventory'>";
                        rowsHTML+="<p id='report82_total_"+item.id+"'></p>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Pending Order'>";
                        rowsHTML+="<p id='report82_ordered_"+item.id+"'></p>";
                    rowsHTML+="</td>";
                    rowsHTML+="<td data-th='Available Inventory'>";
                        rowsHTML+="<p id='report82_available_"+item.id+"'></p>";
                    rowsHTML+="</td>";
                    rowsHTML+="</tr>";

                    $('#report82_body').append(rowsHTML);

                    get_inventory(item.name,'',function (inventory) 
                    {
                        document.getElementById("report82_total_"+item.id).innerHTML=inventory;
                        var sale_item_json={data_store:'sale_order_items',sum:'yes',return_column:'quantity',
                                           indexes:[{index:'bill_status',exact:'pending'},
                                                   {index:'item_name',exact:item.name}]};
                        read_json_single_column(sale_item_json,function (sale_items) 
                        {
                            if(sale_items.length>0)
                            {
                                var av_inventory=parseFloat(inventory)-parseFloat(sale_items[0]);
                                document.getElementById("report82_ordered_"+item.id).innerHTML=sale_items[0];
                                document.getElementById("report82_available_"+item.id).innerHTML=av_inventory;
                            }
                            else
                            {
                                document.getElementById("report82_ordered_"+item.id).innerHTML='0';
                                document.getElementById("report82_available_"+item.id).innerHTML=inventory;
                            }
                        });
                    });				
                });		

                paginator.update_index(items.length);
				initialize_tabular_report_buttons(columns,'Inventory Report','report82',function (item) 
                {
                    total_export_requests+=1;
                    get_inventory(item.name,'',function (inventory) 
                    {
                        item['total inventory']=inventory;
                        var sale_item_json={data_store:'sale_order_items',sum:'yes',return_column:'quantity',
                                           indexes:[{index:'bill_status',exact:'pending'},
                                                   {index:'item_name',exact:item.name}]};
                        read_json_single_column(sale_item_json,function (sale_items) 
                        {
                            if(sale_items.length>0)
                            {
                                var av_inventory=parseFloat(inventory)-parseFloat(sale_items[0]);
                                item['pending order']=sale_items[0];
                                item['available inventory']=av_inventory;
                            }
                            else
                            {
                                item['pending order']='0';
                                item['available inventory']=inventory;
                            }
                            total_export_requests-=1;
                        });
                    });
                });
                
                hide_loader();
            });
        };
	
	</script>
</div>