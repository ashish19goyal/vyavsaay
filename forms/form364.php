<div id='form364' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form364_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form364_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form364_print'><i class='fa fa-print'></i> Print</a>
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
					<form id='form364_header'></form>
						<th><input type='text' placeholder="Issuing Company" class='floatlabel' name='company' form='form364_header'></th>
						<th><input type='text' placeholder="Policy #" class='floatlabel' name='policy' form='form364_header'></th>
						<th><input type='text' placeholder="Policy Holder" class='floatlabel' name='holder' form='form364_header'></th>
						<th><input type='text' placeholder="Gross Premium" readonly='readonly' form='form364_header'></th>
						<th><input type='text' placeholder="Loading Premium" readonly='readonly' form='form364_header'></th>
						<th><input type='text' placeholder="Comments" readonly='readonly' form='form364_header'></th>
						<th><input type='submit' form='form364_header' style='display: none;'></th>
				</tr>
			</thead>
			<tbody id='form364_body'>
			</tbody>
		</table>
	</div>

	<script>
		function form364_header_ini()
		{
			var filter_fields=document.getElementById('form364_header');
			var company_filter=filter_fields.elements['company'];
			var policy_filter=filter_fields.elements['policy'];
			var holder_filter=filter_fields.elements['holder'];

			var company_data={data_store:'policy_types',return_column:'issuer'};
			var policy_data={data_store:'policies',return_column:'policy_num'};
			var holder_data={data_store:'customers',return_column:'acc_name'};

			set_my_filter_json(company_data,company_filter);
			set_my_filter_json(policy_data,policy_filter);
			set_my_filter_json(holder_data,holder_filter);

			$(filter_fields).off('submit');
			$(filter_fields).on('submit',function(event)
			{
				event.preventDefault();
				form364_ini();
			});
		};

		function form364_ini()
		{
			show_loader();
			var fid=$("#form364_link").attr('data_id');
			if(fid==null)
				fid="";

			$('#form364_body').html("");

			var filter_fields=document.getElementById('form364_header');
			var fcompany=filter_fields.elements['company'].value;
			var fpolicy=filter_fields.elements['policy'].value;
			var fholder=filter_fields.elements['holder'].value;

			var paginator=$('#form364_body').paginator();

			var new_columns={count:paginator.page_size(),
							start_index:paginator.get_index(),
							data_store:'policies',
							indexes:[{index:'id',value:fid},
									{index:'issuer',value:fcompany},
									{index:'policy_holder',value:fholder},
									{index:'policy_num',value:fpolicy},
									{index:'premium'},
									{index:'loading_premium'},
									{index:'loading_premium_status',exact:'undecided'}]};

			read_json_rows('form364',new_columns,function(results)
			{
				results.forEach(function(result)
				{
					var rowsHTML="<tr>";
						rowsHTML+="<form id='form364_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Issuer'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form364_"+result.id+"' value='"+result.issuer+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Policy #'>";
								rowsHTML+="<a onclick=\"show_object('policies','"+result.policy_num+"');\"><textarea readonly='readonly' form='form364_"+result.id+"'>"+result.policy_num+"</textarea></a>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Policy #'>";
								rowsHTML+="<a onclick=\"show_object('customers','"+result.holder+"');\"><textarea readonly='readonly' form='form364_"+result.id+"'>"+result.policy_holder+"</textarea></a>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Gross Premium'>";
								rowsHTML+="<input type='number' step='any' readonly='readonly' form='form364_"+result.id+"' value='"+result.premium+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Overloading Premium'>";
								rowsHTML+="<input type='number' step='any' readonly='readonly' form='form364_"+result.id+"' value='"+result.overloading_premium+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Comments'>";
								rowsHTML+="<textarea form='form364_"+result.id+"' name='comments'></textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form364_"+result.id+"' value='"+result.id+"'>";
								rowsHTML+="<button type='button' class='btn green' name='discount' form='form364_"+result.id+"' title='Discounted' onclick=\"form364_discount_item('"+result.id+"');\">Discounted</button>";
								rowsHTML+="<button type='button' class='btn red' name='paid' form='form364_"+result.id+"' title='Paid' onclick=\"form364_paid_item('"+result.id+"');\">Paid</button>";
							rowsHTML+="</td>";
					rowsHTML+="</tr>";

					$('#form364_body').append(rowsHTML);
				});

				$('#form364').formcontrol();
				paginator.update_index(results.length);
				vExport.export_buttons({action:'dynamic',columns:new_columns,file:'Overloading Premiums - Pending Approval',report_id:'form364'});
				hide_loader();
			});
		};

		function form364_paid_item(data_id)
		{
			if(is_update_access('form364'))
			{
				var form = document.getElementById("form364_"+data_id);
				var comments= form.elements['comments'].value;

				var last_updated=get_my_time();
				var data_json={data_store:'policies',
	 				data:[{index:'id',value:data_id},
	 					{index:'loading_premium_notes',value:comments},
	 					{index:'loading_premium_status',value:'paid'},
	 					{index:'last_updated',value:last_updated}]};

				update_json(data_json);
				$(form).readonly();
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form364_discount_item(data_id)
		{
			if(is_update_access('form364'))
			{
				var form = document.getElementById("form364_"+data_id);
				var comments= form.elements['comments'].value;
				var last_updated=get_my_time();
				var data_json={data_store:'policies',
	 				data:[{index:'id',value:data_id},
	 					{index:'loading_premium_notes',value:comments},
	 					{index:'loading_premium_status',value:'discounted'},
	 					{index:'last_updated',value:last_updated}]};

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
