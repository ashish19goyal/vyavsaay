<div id='report98' class='tab-pane portlet box red-sunglo'>	   
	<div class="portlet-title">
		<div class='caption'>		
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='report98_ini();'>Refresh</a>
		</div>		
		<div class="actions">
      	<a class='btn btn-default btn-sm' id='report98_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
      	<a class='btn btn-default btn-sm' id='report98_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
      	<a class='btn btn-default btn-sm' id='report98_print'><i class='fa fa-print'></i> Print</a>
      	<a class='btn btn-default btn-sm' id='report98_email'><i class='fa fa-envelope'></i> Email</a>
      </div>	
	</div>
	
	<div class="portlet-body">
		<form id='report98_header' autocomplete="off">
			<fieldset>
				<label><input type='text' placeholder="Source" class='floatlabel' name='source'></label>
				<label><input type='text' placeholder="Keyword" class='floatlabel' name='keyword'></label>
				<label><input type='text' placeholder="From Date" class='floatlabel' name='start'></label>
				<label><input type='text' placeholder="To Date" class='floatlabel' name='end'></label>
				<label><input type='text' placeholder="Status" class='floatlabel' name='status'></label>
				<label><input type='submit' class='submit_hidden'></label>			
			</fieldset>
		</form>
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<th>Source</th>
					<th>Data</th>
					<th>Date</th>
					<th>Status</th>
				</tr>
			</thead>
			<tbody id='report98_body'>
			</tbody>
		</table>
	</div>
	
	<script>

		function report98_header_ini()
		{	
			var form=document.getElementById('report98_header');
			var source_filter=form.elements['source'];
			var status_filter=form.elements['status'];
			var keyword_filter=form.elements['keyword'];
			var start_date=form.elements['start'];
			var end_date=form.elements['end'];
		
			$(form).off('submit');
			$(form).on('submit',function(event)
			{
				event.preventDefault();
				report98_ini();
			});
		
			var source_data=new Object();
				source_data.data_store='qr_scans';
				source_data.indexes=[{index:'source'}];		
				source_data.return_column='source';
			set_my_filter_json(source_data,source_filter);
			
			set_static_filter_json('qr_scans','status',status_filter);
							
			$(start_date).datepicker();
			$(end_date).datepicker();
			start_date.value=get_my_past_date((get_my_time()-(30*86400000)));
			end_date.value=get_my_date();			
			$(start_date).add(end_date).trigger('change');
		}	
		
		function report98_ini()
		{
			var form=document.getElementById('report98_header');
			var source_filter=form.elements['source'].value;
			var status_filter=form.elements['status'].value;
			var keyword_filter=form.elements['keyword'].value;
			var start_date=get_raw_time(form.elements['start'].value);
			var end_date=get_raw_time(form.elements['end'].value)+86400000;
			
			console.log(start_date);
			console.log(form.elements['end']);
			
			show_loader();
			$('#report98_body').html('');	
			
			var paginator=$('#report98_body').paginator();
			
			var qr_data=new Object();
					qr_data.count=paginator.page_size();
					qr_data.start_index=paginator.get_index();
					qr_data.data_store='qr_scans';
							
					qr_data.indexes=[{index:'id'},
									{index:'source',value:source_filter},
									{index:'status',value:status_filter},
									{index:'data',value:keyword_filter},
									{index:'time',lowerbound:start_date,upperbound:end_date}];
			read_json_rows('report98',qr_data,function(items)
			{
				var rowsHTML="";
				items.forEach(function(item)
				{
					item.time=get_my_datetime(item.time);
					rowsHTML+="<tr>";
					rowsHTML+="<td data-th='Source'>";
						rowsHTML+=item.source;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Data'>";
						rowsHTML+=item.data;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Date'>";
						rowsHTML+=item.time;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Status'><span class='label label-sm "+status_label_colors[item.status]+"'>";
						rowsHTML+=item.status;
					rowsHTML+="</span></td>";
					rowsHTML+="</tr>";
				});
				$('#report98_body').append(rowsHTML);
				
				paginator.update_index(items.length);
				
				initialize_tabular_report_buttons(qr_data,'QR Scan Data','report98',function (item) 
				{
					item.time=get_my_datetime(item.time);
					delete item.id;
				});				
				hide_loader();
			});
		};

	</script>
</div>