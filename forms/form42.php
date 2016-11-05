<div id='form42' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form42_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form42_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form42_print'><i class='fa fa-print'></i> Print</a>
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
					<form id='form42_header'></form>
						<th><input type='text' placeholder="Bill Number" class='floatlabel' name='bill' form='form42_header'></th>
            			<th><input type='text' placeholder="Customer" class='floatlabel' name='customer' form='form42_header'></th>
						<th><input type='text' placeholder="Bill Date" class='floatlabel' name='bill_date' form='form42_header'></th>
						<th><input type='text' placeholder="Bill Amount" readonly='readonly' form='form42_header'></th>
						<th><input type='submit' form='form42_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form42_body'>
			</tbody>
		</table>
	</div>

	<script>

	function form42_header_ini()
	{
		var filter_fields=document.getElementById('form42_header');
		var bill_filter=filter_fields.elements['bill'];
		var name_filter=filter_fields.elements['customer'];

		var bill_data={data_store:'bills',return_column:'bill_num'};
		var cust_data={data_store:'customers',return_column:'acc_name'};

		$(filter_fields).off('submit');
		$(filter_fields).on('submit',function(event)
		{
			event.preventDefault();
			form42_ini();
		});

		set_my_filter_json(bill_data,bill_filter);
		set_my_filter_json(cust_data,name_filter);
	};

	function form42_ini()
	{
		show_loader();
		var fid=$("#form42_link").attr('data_id');
		if(fid==null)
			fid="";

		$('#form42_body').html("");

		var filter_fields=document.getElementById('form42_header');
		var fnum=filter_fields.elements['bill'].value;
		var fname=filter_fields.elements['customer'].value;
		var fdate=get_raw_time(filter_fields.elements['bill_date'].value);

		var paginator=$('#form42_body').paginator();

		var columns={count:paginator.page_size(),
					start_index:paginator.get_index(),
					data_store:'bills',
					indexes:[{index:'id',value:fid},
								{index:'bill_num',value:fnum},
								{index:'customer_name',value:fname},
								{index:'bill_date',value:fdate},
								{index:'type'},
								{index:'total'},
								{index:'status'}]};

		read_json_rows('form42',columns,function(results)
		{
			results.forEach(function(result)
			{
				var cancelled_bill="";
				if(result.status=='cancelled')
				{
					cancelled_bill="style='opacity:0.5' title='This bill was cancelled'";
				}

				var rowsHTML="<tr "+cancelled_bill+">";
					rowsHTML+="<form id='form42_"+result.id+"'></form>";
						rowsHTML+="<td data-th='Bill Number'>";
							rowsHTML+="<a><input type='text' readonly='readonly' form='form42_"+result.id+"' value='"+result.bill_num+"'></a>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Customer'>";
							rowsHTML+="<textarea readonly='readonly' form='form42_"+result.id+"'>"+result.customer_name+"</textarea>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Bill Date'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form42_"+result.id+"' value='"+get_my_past_date(result.bill_date)+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Bill Amount'>";
							rowsHTML+="<input type='text' readonly='readonly' form='form42_"+result.id+"' value='"+result.total+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Action'>";
							rowsHTML+="<input type='hidden' form='form42_"+result.id+"' name='id' value='"+result.id+"'>";
						if(result.status!='cancelled')
						{
							rowsHTML+="<button type='button' class='btn red' form='form42_"+result.id+"' title='Cancel Bill' onclick='form42_delete_item($(this));'><i class='fa fa-trash'></i></button>";
						}
						rowsHTML+="</td>";
				rowsHTML+="</tr>";

				$('#form42_body').append(rowsHTML);
				var fields=document.getElementById("form42_"+result.id);
				if(result.status!='cancelled')
				{
					var bill_num=fields.elements[0];
					$(bill_num).parent().on('click',function()
					{
						element_display(result.id,'form119',['form72','form91','form130','form154','form225','form294','form332']);
					});
				}
			});

			$('#form42').formcontrol();
			paginator.update_index(results.length);
			vExport.export_buttons({action:'dynamic',columns:columns,file:'Sale Bills',report_id:'form42',feach:function (item)
			{
				item.bill_date=get_my_past_date(item.bill_date);
			}});
			hide_loader();
		});
	}

	function form42_delete_item(button)
	{
		if(is_delete_access('form42'))
		{
			modal115_action(function()
			{
				var form_id=$(button).attr('form');
				var form=document.getElementById(form_id);

				var bill_num=form.elements[0].value;
				var data_id=form.elements['id'].value;
				var last_updated=get_my_time();

				var bill_json={data_store:'bills',
						log:'yes',
						data:[{index:'id',value:data_id},
							{index:'status',value:'cancelled'},
							{index:'last_updated',value:last_updated}],
						log_data:{title:'Cancelled',notes:'Bill # '+bill_num,link_to:'form42'}};

				var transaction_json={data_store:'transactions',
						data:[{index:'id',value:data_id}]};

				var t2_json={data_store:'transactions',
						data:[{index:'receipt_source_id',value:data_id}]};

				var receipt_json={data_store:'receipts',
						data:[{index:'source_id',value:data_id}]};

				update_json(bill_json);
				delete_json(transaction_json);
				delete_json(t2_json);
				delete_json(receipt_json);

				var items_json={data_store:'bill_items',
							data:[{index:'bill_id',value:data_id}]};
				delete_json(items_json);

				$(button).parent().parent().attr('style','opacity:0.5');
				$(button).parent().parent().attr('title','This bill was cancelled');
				$(button).hide();
			});
		}
		else
		{
			$("#modal2_link").click();
		}
	}

	</script>
</div>
