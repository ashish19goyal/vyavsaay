<div id='report127' class='tab-pane portlet box red-sunglo'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='report127_ini();'>Refresh</a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
					<li>
                      	<a id='report127_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='report127_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li>
                        <a id='report127_email'><i class='fa fa-envelope'></i> Email</a>
                    </li>
                </ul>
            </div>
        </div>
	</div>

	<div class="portlet-body">
		<form id='report127_header' autocomplete="off">
			<fieldset>
				<label><input type='text' placeholder="Start Date" class='floatlabel' name='start'></label>
				<label><input type='text' placeholder="End Date" class='floatlabel' name='end'></label>
				<label><input type='submit' class='submit_hidden'></label>
			</fieldset>
		</form>
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<th>Bill Date</th>
          			<th>Bill Number</th>
          			<th>Supplier</th>
          			<th>Tax</th>
					<th>Total</th>
        		</tr>
			</thead>
			<tbody id='report127_body'></tbody>
			<tfoot id='report127_foot'></tfoot>
		</table>
	</div>

	<script>
	function report127_header_ini()
	{
		var form=document.getElementById('report127_header');
		var start_filter=form.elements['start'];
		var end_filter=form.elements['end'];

		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();
			report127_ini();
		});

		$(start_filter).datepicker();
		$(end_filter).datepicker();

		start_filter.value=vTime.date({addDays:-7});
		end_filter.value=vTime.date();

		$('#report127_body').paginator({visible:false});
		vUtil.delay(function(){
			$('#report127').formcontrol();
		});
	}

	function report127_ini()
	{
		var form=document.getElementById('report127_header');
		var start_filter=get_raw_time(form.elements['start'].value);
		var end_filter=get_raw_time(form.elements['end'].value);

		show_loader();
		$('#report127_body').html('');

		var columns={data_store:'supplier_bills',
					indexes:[{index:'total'},
							{index:'tax'},
							{index:'bill_id'},
							{index:'supplier'},
							{index:'bill_date',lowerbound:(start_filter-1),upperbound:(end_filter+86400000-1)}]};
		read_json_rows('report127',columns,function(items)
		{
			var rowsHTML="";
			var total_tax=0;
			var bill_total=0;
			items.forEach(function(item)
			{
				rowsHTML+="<tr>";
				rowsHTML+="<td data-th='Bill Date'>";
					rowsHTML+=get_my_past_date(item.bill_date);
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Bill Number'>";
					rowsHTML+=item.bill_id;
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Supplier'>";
					rowsHTML+=item.supplier;
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Total'>";
					rowsHTML+="Rs. "+item.tax;
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Total'>";
					rowsHTML+="Rs. "+item.total;
				rowsHTML+="</td>";
				rowsHTML+="</tr>";

				if(!isNaN(item.tax))
					total_tax+=parseFloat(item.tax);
				if(!isNaN(item.total))
					bill_total+=parseFloat(item.total);
			});

			var footHTML="<tr><td colspan='3'><b>Total<b></td><td><b>Rs. "+total_tax+"</b></td><td><b>Rs. "+bill_total+"</b></td></tr>";

			$('#report127_body').html(rowsHTML);
			$('#report127_foot').html(footHTML);
			/////////////
			vExport.export_buttons({file:'Total Purchase',report_id:'report127',action:'static'});
			hide_loader();
		});
	};

	</script>
</div>
