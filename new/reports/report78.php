<div id='report78' class='tab-pane portlet box red-sunglo'>	   
	<div class="portlet-title">
		<div class='caption'>		
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='report78_ini();'>Refresh</a>
		</div>		
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                      	<a id='report78_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='report78_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='report78_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li>
                        <a id='report78_email'><i class='fa fa-envelope'></i> Email</a>
                    </li>
                </ul>
            </div>
        </div>	
	</div>
	
	<div class="portlet-body">
		<form id='report78_header' autocomplete="off">
			<fieldset>
				<label><input type='text' placeholder="Customer" class='floatlabel' name='customer'></label>
				<label><input type='text' placeholder="Date" class='floatlabel' name='date'></label>
				<label><input type='submit' class='submit_hidden'></label>			
			</fieldset>
		</form>
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<th>Date</th>
					<th>Response</th>
					<th>Details</th>
					<th>Next Follow-up</th>
				</tr>
			</thead>
			<tbody id='report78_body'>
			</tbody>
		</table>
	</div>
	
	<script>

function report78_header_ini()
{	
	var form=document.getElementById('report78_header');
	var customer_filter=form.elements['customer'];
	var date_filter=form.elements['date'];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report78_ini();
	});

	var customer_data={data_store:'customers',return_column:'acc_name'};
	set_my_filter_json(customer_data,customer_filter);
	$(date_filter).datepicker();
	$('#report78').formcontrol();
}

function report78_ini()
{
	var form=document.getElementById('report78_header');
	var customer_filter=form.elements['customer'].value;
	var date_filter=form.elements['date'].value;
	
	show_loader();
	
	$('#report78_body').html('');
	
	var paginator=$('#report78_body').paginator();
			
	var follow_up_data=new Object();
			follow_up_data.count=paginator.page_size();
			follow_up_data.start_index=paginator.get_index();
			follow_up_data.data_store='followups';
					
			follow_up_data.indexes=[{index:'id'},
							{index:'customer',exact:customer_filter},
							{index:'date',value:date_filter},
							{index:'response'},{index:'detail'},{index:'next_date'},{index:'source_id'}];
								
	read_json_rows('report78',follow_up_data,function(followups)
	{
		var rowsHTML="";
		followups.forEach(function (followup) 
		{
			rowsHTML+="<tr>";
			rowsHTML+="<td data-th='Date'><a title='Click to go to the lead' onclick=element_display('"+followup.source_id+"','form213');>";
				rowsHTML+=get_my_past_date(followup.date);
			rowsHTML+="</a></td>";
			rowsHTML+="<td data-th='Response'><span class='label label-sm "+status_label_colors[followup.response]+"'>";
				rowsHTML+=followup.response;
			rowsHTML+="</span></td>";
			rowsHTML+="<td data-th='Details'>";
				rowsHTML+=followup.detail;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Next follow-up'>";
				rowsHTML+=get_my_past_date(followup.next_date);
			rowsHTML+="</td>";
			rowsHTML+="</tr>";			
		});
		$('#report78_body').html(rowsHTML);
		hide_loader();
	
		paginator.update_index(followups.length);
				
		initialize_tabular_report_buttons(follow_up_data,'Sale Lead followups','report78',function (item) 
		{
			item.next_date=get_my_past_date(item.next_date);
			item.date=get_my_past_date(item.date);
			delete item.source_id;
		});	
	});				
};
	
	</script>
</div>