<div id='form339' class='tab-pane portlet box green-meadow'>	   
	<div class="portlet-title">
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form339_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form339_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form339_print'><i class='fa fa-print'></i> Print</a>
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
					<form id='form339_header'></form>
						<th><input type='text' placeholder="Item" class='floatlabel' name='name' form='form339_header'></th>
						<th><input type='text' placeholder="Batch" class='floatlabel' name='batch' form='form339_header'></th>
						<th><input type='text' placeholder="MRP" name='mrp' readonly='readonly' form='form339_header'></th>
						<th><input type='text' placeholder="Cost Price"  readonly='readonly' form='form339_header'></th>
						<th><input type='text' placeholder="Sale Price" readonly="readonly" form='form339_header'></th>
						<th><input type='submit' form='form339_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form339_body'>
			</tbody>
		</table>
	</div>
    
    <script>
    function form339_header_ini()
    {
        var filter_fields=document.getElementById('form339_header');	
        var names_filter=filter_fields.elements['name'];
        var batches_filter=filter_fields.elements['batch'];

        $(filter_fields).off('submit');
        $(filter_fields).on('submit',function(event)
        {
            event.preventDefault();
            form339_ini();
        });
        //setting autocompletes 
        var products_data={data_store:'product_master',return_column:'name'};
        var batch_data={data_store:'product_instances',return_column:'batch'};
    
        set_my_filter_json(products_data,names_filter);
        set_my_filter_json(batch_data,batches_filter);
    };

    function form339_ini()
    {
        show_loader();
        var fid=$("#form339_link").attr('data_id');
        if(fid==null)
            fid="";	

        $('#form339_body').html("");

        var filter_fields=document.getElementById('form339_header');
        var fname=filter_fields.elements['name'].value;
        var fbatch=filter_fields.elements['batch'].value;

        var paginator=$('#form339_body').paginator();
			
        var columns=new Object();
				columns.count=paginator.page_size();
				columns.start_index=paginator.get_index();
				columns.data_store='product_instances';
				columns.indexes=[{index:'id',value:fid},
									{index:'product_name',value:fname},
									{index:'batch',value:fbatch},
									{index:'mrp'},{index:'cost_price'},
									{index:'sale_price'}];
			
        read_json_rows('form339',columns,function(results)
        {
            results.forEach(function(result)
            {
                var rowsHTML="<tr>";
                    rowsHTML+="<form id='form339_"+result.id+"'></form>";
                        rowsHTML+="<td data-th='Name'>";
                            rowsHTML+="<a onclick=\"show_object('product_master','"+result.product_name+"')\"><textarea readonly='readonly' form='form339_"+result.id+"'>"+result.product_name+"</textarea></a>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Batch'>";
                        	rowsHTML+="<input type='text' readonly='readonly' form='form339_"+result.id+"' value='"+result.batch+"'>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='MRP'>";
                            rowsHTML+="<input type='number' step='any' readonly='readonly' form='form339_"+result.id+"' class='dblclick_editable' value='"+result.mrp+"'>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Cost price'>";
                            rowsHTML+="<input type='number' step='any' readonly='readonly' form='form339_"+result.id+"' class='dblclick_editable' value='"+result.cost_price+"'>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Sale price'>";
                            rowsHTML+="<input type='number' step='any' readonly='readonly' form='form339_"+result.id+"' value='"+result.sale_price+"' class='dblclick_editable'>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Action'>";
                            rowsHTML+="<input type='hidden' form='form339_"+result.id+"' value='"+result.id+"'>";
                            rowsHTML+="<button type='submit' class='btn green' name='save' title='Save' form='form339_"+result.id+"'><i class='fa fa-save'></i></button>";
                        rowsHTML+="</td>";			
                rowsHTML+="</tr>";

                $('#form339_body').append(rowsHTML);
                var fields=document.getElementById("form339_"+result.id);
                $(fields).on("submit", function(event)
                {
                    event.preventDefault();
                    form339_update_item(fields);
                });
            });
            
            $('#form339').formcontrol();
			paginator.update_index(results.length);
			initialize_tabular_report_buttons(columns,'Pricing Details','form339',function (item){});
			hide_loader();
        });
    };

    function form339_update_item(form)
    {
        if(is_update_access('form339'))
        {
            var name=form.elements[0].value;
            var mrp=form.elements[2].value;
            var cost_price=form.elements[3].value;
            var sale_price=form.elements[4].value;
            var data_id=form.elements[5].value;
            var last_updated=get_my_time();
            
            var data_json={data_store:'product_instances',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'mrp',value:mrp},
	 					{index:'cost_price',value:cost_price},
                        {index:'sale_price',value:sale_price},  
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Updated',notes:'Pricing for '+name,link_to:'form339'}};
 				
            update_json(data_json);
            $(form).readonly();
        }
        else
        {
            $("#modal2_link").click();
        }
    }
    
    </script>
</div>