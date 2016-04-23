<div id='report95' class='tab-pane portlet box red-sunglo'>	   
	<div class="portlet-title">
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='report95_pdf'><i class='fa fa-file-pdf-o'></i> Download as PDF</a>
                    </li>
                    <li>
                        <a id='report95_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li>
                        <a id='report95_email'><i class='fa fa-envelope'></i> Email</a>
                    </li>
                </ul>
            </div>
        </div>	
	</div>
	
	<div class="portlet-body">
		<form id='report95_header' autocomplete="off">
			<fieldset>
			     <input type='text' placeholder='Scan AWB #' class='floatlabel' required name='awb'>
				<label><input type='submit' class='submit_hidden'></label>			
			</fieldset>
		</form>
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<th>AWB #</th>
                    <th>Pincode</th>
                    <th>Zone</th>
                </tr>
			</thead>
			<tbody id='report95_body'></tbody>
		</table>
	</div>
	
	<script>

    function report95_header_ini()
    {	
        var form=document.getElementById('report95_header');
        var awb_filter=form.elements['awb'];

        $('#report95_body').html('');

        $(form).off('submit');
        $(form).on('submit',function(event)
        {
            event.preventDefault();
            report95_ini();
        });
        
        initialize_static_tabular_report_buttons('Order Sorting','report95');
        $(awb_filter).focus();
    }

    function report95_ini()
    {
        show_loader();
        var form=document.getElementById('report95_header');
        var awb_filter=form.elements['awb'];
        var awb=awb_filter.value;

        var master_data={data_store:'logistics_orders',count:1,return_column:"pincode",indexes:[{index:'awb_num',exact:awb}]};
        read_json_single_column(master_data,function(awbs)
        {
            if(awbs.length>0)
            {
                var zone_data={data_store:'pincodes',return_column:'zone',count:1,
                              indexes:[{index:'status',exact:'active'},
                                      {index:'pincode',exact:awbs[0]}]};
                read_json_single_column(zone_data,function(pincodes)
                {				
                    if(pincodes.length>0)
                    {
                        var rowsHTML="<tr>";
                            rowsHTML+="<td data-th='AWB #'>";
                                rowsHTML+=awb;
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Pincode'>";
                                rowsHTML+=awbs[0];
                            rowsHTML+="</td>";
                            rowsHTML+="<td data-th='Zone'>";
                                rowsHTML+=pincodes[0];
                            rowsHTML+="</td>";
                        rowsHTML+="</tr>";

                        $('#report95_body').prepend(rowsHTML);
                    }
                    else
                    {
                        $("#modal76_link").click();
                    }
                    awb_filter.value="";
                    hide_loader();
                });	
            }
            else 
            {
                $("#modal71_link").click();
                awb_filter.value="";
                hide_loader();
            }	  		   
        });
    };
	
	</script>
</div>