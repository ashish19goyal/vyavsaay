<div id='form166' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form166_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form166_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form166_print'><i class='fa fa-print'></i> Print</a>
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
					<form id='form166_header'></form>
						<th><input type='text' placeholder="Item" class='floatlabel' name='name' form='form166_header'></th>
						<th><input type='text' placeholder="MRP" name='mrp' readonly='readonly' form='form166_header'></th>
						<th><input type='text' placeholder="Cost Price"  readonly='readonly' form='form166_header'></th>
						<th><input type='text' placeholder="Sale Price" readonly="readonly" form='form166_header'></th>
						<th><input type='submit' form='form166_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form166_body'>
			</tbody>
		</table>
	</div>

    <script>
    function form166_header_ini()
    {
        var filter_fields=document.getElementById('form166_header');
        var names_filter=filter_fields.elements['name'];
        //var batches_filter=filter_fields.elements[1];

        $(filter_fields).off('submit');
        $(filter_fields).on('submit',function(event)
        {
            event.preventDefault();
            form166_ini();
        });
        //setting autocompletes
        var products_data={data_store:'product_master',return_column:'name'};

        /*var batch_data="<product_instances>" +
                "<batch></batch>" +
                "</product_instances>";
    */
        set_my_filter_json(products_data,names_filter);
        //set_my_filter(batch_data,batches_filter);
    };

    function form166_ini()
    {
        show_loader();
        var fid=$("#form166_link").attr('data_id');
        if(fid==null)
            fid="";

        $('#form166_body').html("");

        var filter_fields=document.getElementById('form166_header');
        var fname=filter_fields.elements['name'].value;
        //var fbatch=filter_fields.elements[1].value;

        var paginator=$('#form166_body').paginator();

			var columns=new Object();
				columns.count=paginator.page_size();
				columns.start_index=paginator.get_index();
				columns.data_store='product_instances';
				columns.indexes=[{index:'id',value:fid},
									{index:'product_name',value:fname},
									{index:'mrp'},{index:'cost_price'},
									{index:'sale_price'}];

        read_json_rows('form166',columns,function(results)
        {
            results.forEach(function(result)
            {
                var rowsHTML="<tr>";
                    rowsHTML+="<form id='form166_"+result.id+"'></form>";
                        rowsHTML+="<td data-th='Name'>";
                            rowsHTML+="<a onclick=\"show_object('product_master','"+result.product_name+"')\"><textarea readonly='readonly' form='form166_"+result.id+"'>"+result.product_name+"</textarea></a>";
                        rowsHTML+="</td>";
                        //rowsHTML+="<td data-th='Batch'>";
                        //	rowsHTML+="<input type='text' readonly='readonly' form='form166_"+result.id+"' value='"+result.batch+"'>";
                        //rowsHTML+="</td>";
                        rowsHTML+="<td data-th='MRP'>";
                            rowsHTML+="<input type='number' step='any' readonly='readonly' form='form166_"+result.id+"' class='dblclick_editable' value='"+result.mrp+"'>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Cost price'>";
                            rowsHTML+="<input type='number' step='any' readonly='readonly' form='form166_"+result.id+"' class='dblclick_editable' value='"+result.cost_price+"'>";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Sale price'>";
                            rowsHTML+="<input type='number' step='any' readonly='readonly' form='form166_"+result.id+"' value='"+result.sale_price+"' class='dblclick_editable'>";
                        //	rowsHTML+="<img src='./images/edit.png' class='edit_icon' onclick=\"modal38_action('"+result.id+"','"+result.sale_price+"');\">";
                        rowsHTML+="</td>";
                        rowsHTML+="<td data-th='Action'>";
                            rowsHTML+="<input type='hidden' form='form166_"+result.id+"' value='"+result.id+"'>";
                            rowsHTML+="<button type='submit' class='btn green' name='save' title='Save' form='form166_"+result.id+"'><i class='fa fa-save'></i></button>";
                        rowsHTML+="</td>";
                rowsHTML+="</tr>";

                $('#form166_body').append(rowsHTML);
                var fields=document.getElementById("form166_"+result.id);
                $(fields).on("submit", function(event)
                {
                    event.preventDefault();
                    form166_update_item(fields);
                });
            });

            $('#form166').formcontrol();
			paginator.update_index(results.length);
			vExport.export_buttons({action:'dynamic',columns:columns,file:'Pricing Details',report_id:'form166'});
			hide_loader();
        });
    };

    function form166_update_item(form)
    {
        if(is_update_access('form166'))
        {
            var name=form.elements[0].value;
            var mrp=form.elements[1].value;
            var cost_price=form.elements[2].value;
            var sale_price=form.elements[3].value;
            var data_id=form.elements[4].value;
            var last_updated=get_my_time();

            var data_json={data_store:'product_instances',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'mrp',value:mrp},
	 					{index:'cost_price',value:cost_price},
                        {index:'sale_price',value:sale_price},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Updated',notes:'Pricing for '+name,link_to:'form166'}};

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
