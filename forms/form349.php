<div id='form349' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<div class='btn-group' id='form349_status' data-toggle='buttons'>
					<label class='btn green-jungle pending active' onclick=form349_ini('pending');><input name='pending' type='radio' class='toggle'>Pending</label>
					<label class='btn green-jungle approved' onclick=form349_ini('approved');><input type='radio' name='approved' class='toggle'>Approved</label>
					<label class='btn green-jungle rejected' onclick=form349_ini('rejected');><input type='radio' name='rejected' class='toggle'>Rejected</label>
			</div>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
										<li>
												<a onclick='modal219_action();'><i class='fa fa-plus'> Add</i></a>
										</li>
										<li class="divider"> </li>
										<li>
                        <a id='form349_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form349_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form349_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li class="divider"> </li>
                    <li>
                        <a id='form349_upload' onclick=modal221_action(form349_import_template,form349_import,form349_import_validate);><i class='fa fa-upload'></i> Import</a>
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
					<form id='form349_header'></form>
						<th><input type='text' placeholder="Claim #" class='floatlabel' name='claim' form='form349_header'></th>
						<th><input type='text' placeholder="Policy #" class='floatlabel' name='policy' form='form349_header'></th>
						<th><input type='text' placeholder="Amount" readonly='readonly' form='form349_header'></th>
						<th><input type='text' placeholder="Notes" readonly='readonly' form='form349_header'></th>
						<th><input type='submit' form='form349_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form349_body'>
			</tbody>
		</table>
	</div>

	<script>
		function form349_header_ini()
		{
			var filter_fields=document.getElementById('form349_header');
			var claim_filter=filter_fields.elements['claim'];
			var policy_filter=filter_fields.elements['policy'];

			var claim_data={data_store:'policy_claims',return_column:'claim_num'};
			set_my_filter_json(claim_data,claim_filter);

			var policy_data={data_store:'policies',return_column:'policy_num'};
			set_my_filter_json(policy_data,policy_filter);

			$(filter_fields).off('submit');
			$(filter_fields).on('submit',function(event)
			{
				event.preventDefault();
				form349_ini();
			});
		}

		function form349_ini(claim_type)
		{
			show_loader();
			var fid=$("#form349_link").attr('data_id');
			if(fid==null)
				fid="";

			$('#form349_body').html("");

			var status_filter='pending';
			if(typeof claim_type!='undefined' && claim_type=='approved')
			{
					status_filter='approved';
					$('#form349_status').find('label.approved').addClass('active');
					$('#form349_status').find('label.pending').removeClass('active');
					$('#form349_status').find('label.rejected').removeClass('active');
			}
			else if(typeof claim_type!='undefined' && claim_type=='rejected')
			{
					status_filter='rejected';
					$('#form349_status').find('label.rejected').addClass('active');
					$('#form349_status').find('label.pending').removeClass('active');
					$('#form349_status').find('label.approved').removeClass('active');
			}
			else
			{
					$('#form349_status').find('label.pending').addClass('active');
					$('#form349_status').find('label.approved').removeClass('active');
					$('#form349_status').find('label.rejected').removeClass('active');
			}

			var filter_fields=document.getElementById('form349_header');
			var fclaim=filter_fields.elements['claim'].value;
			var fpolicy=filter_fields.elements['policy'].value;

			var paginator=$('#form349_body').paginator();

			var new_columns={count:paginator.page_size(),
											start_index:paginator.get_index(),
											data_store:'policy_claims',
											indexes:[{index:'id',value:fid},
															{index:'claim_num',value:fclaim},
															{index:'policy_num',value:fpolicy},
															{index:'policy_holder'},
															{index:'amount'},
															{index:'notes'},
															{index:'agent'},
															{index:'status',exact:status_filter}]};

			read_json_rows('form349',new_columns,function(results)
			{
				results.forEach(function(result)
				{
					var notes_array=vUtil.jsonParse(result.notes);
					var notes="";
					notes_array.forEach(function(note)
					{
						notes+=vTime.date({time:note.date})+": "+note.detail+"\n";
					});
					var rowsHTML="<tr>";
						rowsHTML+="<form id='form349_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Claim #'>";
								rowsHTML+="<a onclick=\"show_object('policy_claims','"+result.claim_num+"');\"><textarea readonly='readonly' form='form349_"+result.id+"' name='claim'>"+result.claim_num+"</textarea></a>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Policy #'>";
								rowsHTML+="<a onclick=\"show_object('policies','"+result.policy_num+"');\"><textarea readonly='readonly' form='form349_"+result.id+"' name='policy'>"+result.policy_num+"</textarea></a>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Amount'>";
								rowsHTML+="<input type='number' readonly='readonly' placeholder='Rs. ' form='form349_"+result.id+"' name='amount' class='floatlabel' step='any' value='"+result.amount+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Notes'>";
								rowsHTML+="<textarea readonly='readonly' form='form349_"+result.id+"'>"+notes+"</textarea>";
							if(result.status=='pending')
							{
								rowsHTML+="<button type='button' class='btn grey' form='form349_"+result.id+"' title='Add Note' name='note'><i class='fa fa-plus'></i></button>";
							}
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form349_"+result.id+"' name='id' value='"+result.id+"'>";
								rowsHTML+="<button type='button' class='btn red' form='form349_"+result.id+"' title='Delete' name='delete' onclick='form349_delete_item($(this));'><i class='fa fa-trash'></i></button>";
							if(result.status=='pending')
							{
								rowsHTML+="<button type='button' class='btn grey' form='form349_"+result.id+"' title='Approve' name='approve'><i class='fa fa-check'></i></button>";
								rowsHTML+="<button type='button' class='btn grey' form='form349_"+result.id+"' title='Reject' name='reject'><i class='fa fa-times'></i></button>";
							}
							rowsHTML+="</td>";
					rowsHTML+="</tr>";

					$('#form349_body').append(rowsHTML);
					var fields=document.getElementById("form349_"+result.id);

					var note_button=fields.elements['note'];
					var approve_button=fields.elements['approve'];
					var reject_button=fields.elements['reject'];

					$(note_button).on('click',function ()
					{
						modal220_action(result.id);
					});

					$(approve_button).on('click',function()
					{
						form349_update_item(fields,'approved');
						$(this).parent().parent().remove();
					});

					$(reject_button).on('click',function()
					{
						form349_update_item(fields,'rejected');
						$(this).parent().parent().remove();
					});

				});

				$('#form349').formcontrol();
				paginator.update_index(results.length);
				initialize_tabular_report_buttons(new_columns,'Policy Claims','form349',function (item){});
				hide_loader();
			});
		};

		function form349_update_item(form,status)
		{
			if(is_update_access('form349'))
			{
				var claim=form.elements['claim'].value;
				var data_id=form.elements['id'].value;
				var last_updated=vTime.unix();
				var data_json={data_store:'policy_claims',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'status',value:status},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:status,notes:'Policy claim # '+claim,link_to:'form349'}};

				update_json(data_json);
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form349_delete_item(button)
		{
			if(is_delete_access('form349'))
			{
				modal115_action(function()
				{
					var form_id=$(button).attr('form');
					var form=document.getElementById(form_id);
					var claim=form.elements['claim'].value;
					var data_id=form.elements['id'].value;
					var data_json={data_store:'policy_claims',
	 					log:'yes',
	 					data:[{index:'id',value:data_id}],
	 					log_data:{title:'Deleted',notes:'Policy claim # '+claim,link_to:'form349'}};

					delete_json(data_json);
					$(button).parent().parent().remove();
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form349_import_template()
		{
			var data_array=['id','claim number','policy number','claim amount','issuer','policy holder','agent','notes','request date','issue date','status'];
			vUtil.arrayToCSV(data_array);
		};

		function form349_import_validate(data_array)
		{
			var validate_template_array=[{column:'policy number',required:'yes',regex:new RegExp('^[0-9a-zA-Z_., ()-]+$')},
															{column:'claim number',required:'yes',regex:new RegExp('^[0-9a-zA-Z_., ()-]+$')},
															{column:'policy holder',regex:new RegExp('^[0-9a-zA-Z _.,\'+@!$()-]+$')},
															{column:'issuer',regex:new RegExp('^[0-9a-zA-Z _.,\'+@!$()-]+$')},
															{column:'agent',regex:new RegExp('^[0-9a-zA-Z _.,\'+@!$()-]+$')},
															{column:'amount',regex:new RegExp('^[0-9 .]+$')},
															{column:'request date',regex:new RegExp('^[0-9]{2}\/[0-9]{2}\/[0-9]{4}')},
															{column:'issue date',regex:new RegExp('^[0-9]{2}\/[0-9]{2}\/[0-9]{4}')},
															{column:'status',list:['pending','approved','rejected']}];

			var error_array=vImport.validate(data_array,validate_template_array);
			return error_array;
		}

		function form349_import(data_array)
		{
			var create_json={data_store:'policy_claims',
 					log:'yes',
 					data:[],
 					log_data:{title:'claims for policies',link_to:'form349'}};

			var update_json={data_store:'policy_claims',
		 					log:'yes',
		 					data:[],
		 					log_data:{title:'claims for policies',link_to:'form349'}};

			var last_updated=vTime.unix();

			data_array.forEach(function(row)
			{
				create_json.data.push(create_json_array);
			});

			create_batch_json(create_json);
			update_batch_json(update_json);
		}


	</script>
</div>
