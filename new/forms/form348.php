<div id='form348' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<div class='btn-group' id='form348_status' data-toggle='buttons'>
					<label class='btn green-jungle basic active' onclick=form348_ini('basic');><input name='basic' type='radio' class='toggle'>Basic</label>
					<label class='btn green-jungle orc' onclick=form348_ini('orc');><input type='radio' name='orc' class='toggle'>ORC</label>
			</div>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
					<li>
                        <a id='form348_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form348_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form348_print'><i class='fa fa-print'></i> Print</a>
                    </li>
						<li class="divider"> </li>
                    <li>
                        <a id='form348_upload' onclick=form348_popup_import_action();><i class='fa fa-upload'></i> Import</a>
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
					<form id='form348_header'></form>
						<th><input type='text' placeholder="Issuing Company" class='floatlabel' name='company' form='form348_header'></th>
						<th><input type='text' placeholder="Policy #" class='floatlabel' name='policy' form='form348_header'></th>
						<th><input type='text' placeholder="Agent" class='floatlabel' name='agent' form='form348_header'></th>
						<th><input type='text' placeholder="Premium" readonly="readonly" form='form348_header'></th>
						<th><input type='text' placeholder="Commission %" readonly="readonly" form='form348_header'></th>
						<th><input type='text' placeholder="Amount" readonly="readonly" form='form348_header'></th>
						<th><input type='submit' form='form348_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form348_body'>
			</tbody>
		</table>
	</div>

	<div class='modal_forms'>

		<a href='#form348_popup_import' data-toggle="modal" id='form348_popup_import_link'></a>
		<div id="form348_popup_import" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<form id='form348_popup_import_form' autocomplete="off">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
							<h4 class="modal-title">Data Import</h4>
						</div>
						<div class="modal-body">
							<div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
							  <div class="row">
								  <div class="col-sm-12 col-md-4">Import Type</div>
								  <div class="col-sm-12 col-md-8"><input type='text' required form='form348_popup_import_form' name='type'></div>
							  </div>
							  <div class="row">
								  <div class='col-md-6'>
										<button type="button" name='download' style='margin-bottom:10px;' class='btn green-jungle'>Download Import Template</button>
								  </div>
							  </div>
							  <div class="row">
								  <div class='col-md-6'>
										<button type='button' name='file_dummy' class='btn red-sunglo'>Select File</button>
								  </div>
							  </div>
							</div>
						</div>
						<div class="modal-footer">
							<button type="submit" class="btn green" form='form348_popup_import_form' name='save'>Import</button>
							<button type="button" class="btn red" form='form348_popup_import_form' data-dismiss='modal' name='cancel'>Cancel</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>

	<script>

		function form348_header_ini()
		{
			var form=document.getElementById('form348_header');
			var policy_filter=form.elements['policy'];
			var agent_filter=form.elements['agent'];
			var company_filter=form.elements['company'];

			var policy_data={data_store:'policies',return_column:'policy_num'};
			set_my_filter_json(policy_data,policy_filter);

			var agent_data={data_store:'attributes',return_column:'name',
							indexes:[{index:'type',exact:'staff'},{index:'attribute',exact:'Designation'},
									{index:'value',exact:'Agent'}]};
			set_my_filter_json(agent_data,agent_filter);

			var company_data={data_store:'policy_types',return_column:'issuer'};
			set_my_filter_json(company_data,company_filter);

			$(form).off('submit');
			$(form).on('submit',function(event)
			{
				event.preventDefault();
				form348_ini();
			});
		}

		function form348_ini(c_type)
		{
			var fid=$("#form348_link").attr('data_id');
			if(fid==null)
				fid="";

			var form=document.getElementById('form348_header');
			var company_filter=form.elements['company'].value;
			var policy_filter=form.elements['policy'].value;
			var agent_filter=form.elements['agent'].value;

			show_loader();
			$('#form348_body').html('');

			var type_filter='basic';
			if(typeof c_type!='undefined' && c_type=='orc')
			{
					type_filter='orc';
					$('#form348_status').find('label.orc').addClass('active');
					$('#form348_status').find('label.basic').removeClass('active');
			}
			else
			{
					$('#form348_status').find('label.basic').addClass('active');
					$('#form348_status').find('label.orc').removeClass('active');
			}

			var paginator=$('#form348_body').paginator();

			var new_columns={count:paginator.page_size(),
							start_index:paginator.get_index(),
							data_store:'policy_commissions',
							indexes:[{index:'id',value:fid},
									{index:'policy_num',value:policy_filter},
									{index:'amount'},
									{index:'comm_percent'},
									{index:'premium'},
									{index:'issue_date'},
									{index:'issuer',value:company_filter},
									{index:'commission_type',value:type_filter},
									{index:'agent',value:agent_filter}]};

			read_json_rows('form348',new_columns,function(results)
			{
				results.forEach(function(result)
				{
					var rowsHTML="<tr>";
						rowsHTML+="<form id='form348_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Issuing Company'>";
								rowsHTML+="<input type='text' readonly='readonly' form='form348_"+result.id+"' value='"+result.issuer+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Policy #'>";
								rowsHTML+="<a onclick=\"show_object('policies','"+result.policy_num+"');\"><textarea readonly='readonly' form='form348_"+result.id+"'>"+result.policy_num+"</textarea></a>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Agent'>";
								rowsHTML+="<a onclick=\"show_object('staff','"+result.agent+"')\"><textarea readonly='readonly' form='form348_"+result.id+"'>"+result.agent+"</textarea></a>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Premium'>";
								rowsHTML+="<input type='number' step='any' readonly='readonly' form='form348_"+result.id+"' value='"+result.premium+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Commission %'>";
								rowsHTML+="<input type='number' step='any' readonly='readonly' form='form348_"+result.id+"' value='"+result.comm_percent+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Amount'>";
								rowsHTML+="<input type='number' step='any' readonly='readonly' form='form348_"+result.id+"' value='"+result.amount+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form348_"+result.id+"' value='"+result.id+"' name='id'>";
								rowsHTML+="<button class='btn red' type='button'  form='form348_"+result.id+"' title='Delete' onclick='form348_delete_item($(this));' name='delete'><i class='fa fa-trash'></i></button>";
							rowsHTML+="</td>";
					rowsHTML+="</tr>";

					$('#form348_body').append(rowsHTML);
				});

				$('#form348').formcontrol();
				paginator.update_index(results.length);
				initialize_tabular_report_buttons(new_columns,'Policy Commissions','form348',function (item)
				{
					item['Commission %']=vTime.date({time:item.comm_percent});
					item['Issue Date']=vTime.date({time:item.issue_date});
					delete item.issue_date;
					delete item.comm_percent;
				});
				hide_loader();
			});
		};

		function form348_delete_item(button)
		{
			if(is_delete_access('form348'))
			{
				modal115_action(function()
				{
					var form_id=$(button).attr('form');
					var form=document.getElementById(form_id);

					var data_id=form.elements['id'].value;
					var data_json={data_store:'policy_commissions',
 							data:[{index:'id',value:data_id}]};

					delete_json(data_json);

					$(button).parent().parent().remove();
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		/**
		* This function inflates the policy data in the commission
		*/
		function form348_policy_details(commissions,policy_num_index,issuer,func)
		{
			var policy_nums = vUtil.arrayColumn(commissions,policy_num_index);
			var policy_data  = {data_store:'policies',indexes:[{index:'id'},
							{index:'policy_num',array:policy_nums},
							{index:'issuer',exact:issuer},
							{index:'agent'},
							{index:'issue_date'}]};
			read_json_rows('form348',policy_data,function(ids)
			{
				ids.forEach(function(id)
				{
					for(var i in commissions)
					{
						if(commissions[i][policy_num_index]==id['policy_num'])
						{
							commissions[i].issue_date = id['issue_date'];
							commissions[i].agent = id['agent'];
							commissions[i].import=true;
						}
					}
				});
				// console.log(policies);
				func();
			});
		}

		function form348_popup_import_action()
		{
			var form=document.getElementById('form348_popup_import_form');

			var import_type=form.elements['type'];
			var template_button=form.elements['download'];
			var dummy_button=form.elements['file_dummy'];
			var import_button=form.elements['save'];

			var import_types_list = ['Apollo Basic','Apollo ORC', 'ICICI Basic', 'ICICI ORC','Max Basic','Max ORC','Star Basic','Star ORC'];
			set_value_list_json(import_types_list,import_type);

			//initializing file import button
			var file_object=vUtil.jsonParse($(dummy_button).fileInput());
			var select_file=document.getElementById(file_object.input);
			var selected_file=document.getElementById(file_object.output);

			$(template_button).off("click");
			$(template_button).on("click",function(event)
			{
				form348_import_template(import_type.value);
			});

			$(form).off('submit');
			$(form).on('submit',function(event)
			{
				event.preventDefault();

				vImport.readFile(select_file,function(content)
			    {
					switch(import_type.value){
						case 'Apollo Basic':vImport.importData(content,form,form348_ab_import,form348_ab_import_validate);
												break;
						case 'Apollo ORC':vImport.importData(content,form,form348_ao_import,form348_ao_import_validate);
												break;
						case 'ICICI Basic':vImport.importData(content,form,form348_ib_import,form348_ib_import_validate);
												break;
						case 'ICICI ORC':vImport.importData(content,form,form348_io_import,form348_io_import_validate);
												break;
						case 'Max Basic':vImport.importData(content,form,form348_mb_import,form348_mb_import_validate);
												break;
						case 'Max ORC':vImport.importData(content,form,form348_mo_import,form348_mo_import_validate);
												break;
						case 'Star Basic':vImport.importData(content,form,form348_sb_import,form348_sb_import_validate);
												break;
						case 'Star ORC':vImport.importData(content,form,form348_so_import,form348_so_import_validate);
												break;
					}
			    });
			});
			$("#form348_popup_import_link").click();
		}


        function form348_import_template(import_type)
        {
			var data_array=[];
			switch(import_type)
			{
            	case 'Apollo Basic': data_array=['Policy Number / Endorsement Number','Policy Holder Name',
												'Product Name','Policy Issuance Date','Policy Start Date',
												'Net Premuim','Service Tax','Gross Premium','Comm %','Comm Amount'];
									break;
				case 'Apollo ORC':data_array=[];
										break;
				case 'ICICI Basic':data_array=[];
													break;
				case 'ICICI ORC':data_array=[];
													break;
				case 'Max Basic':data_array=[];
												break;
				case 'Max ORC': data_array=[];
												break;
				case 'Star Basic':data_array=[];
												break;
				case 'Star ORC':data_array=[];
										break;
			}
            my_array_to_csv(data_array);
        };

		/**
		*	Import validation for apollo basic commissions
		*/
		function form348_ab_import_validate(data_array)
        {
            var validate_template_array=[{column:'Policy Number / Endorsement Number',required:'yes',regex:new RegExp('^[0-9a-zA-Z_-]+$')},
                                    {column:'Policy Holder Name',required:'yes',regex:new RegExp('^[0-9a-zA-Z _.,()-]+$')},
									{column:'Product Name',required:'yes',regex:new RegExp('^[0-9a-zA-Z _.,()-]+$')},
									{column:'Policy Issuance Date',required:'yes',regex:new RegExp('^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{2,4}')},
									{column:'Policy Start Date',required:'yes',regex:new RegExp('^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{2,4}')},
									{column:'Net Premuim',required:'yes',regex:new RegExp('^[0-9 .-]+$')},
									{column:'Service Tax',required:'yes',regex:new RegExp('^[0-9 .-]+$')},
									{column:'Gross Premium',required:'yes',regex:new RegExp('^[0-9 .-]+$')},
									{column:'Comm %',required:'yes',regex:new RegExp('^[0-9 .-]+$')},
									{column:'Comm Amount',required:'yes',regex:new RegExp('^[0-9 .-]+$')}];

            var error_array=vImport.validate(data_array,validate_template_array);
            return error_array;
        }

		/**
		*	Import for apollo basic commissions
		*/
		function form348_ab_import(commissions)
		{
			var create_comm_json={data_store:'policy_commissions',log:'yes',data:[],
							log_data:{title:'Basic Commissions from Apollo',link_to:'form348'}};

			var counter=1;
			var last_updated=vTime.unix();
			show_loader();

			for(var a in commissions)
			{
				commissions[a].policy_num=commissions[a]['Policy Number / Endorsement Number'];
				commissions[a].issue_date="";
				commissions[a].issuer="Apollo";
				commissions[a].commission_type="basic";
				commissions[a].agent="";
				commissions[a].import=false;
			}

			form348_policy_details(commissions,'policy_num','Apollo',function()
			{
				// console.log(commissions);
				var key=vUtil.newKey();
				for(var i=0;i<commissions.length;i++)
				{
					if(commissions[i].import)
					{
						key++;
						var data_json_array=[{index:'id',value:key},
									{index:'policy_num',value:commissions[i].policy_num,uniqueWith:['commission_type','premium']},
									{index:'amount',value:commissions[i]['Comm Amount']},
									{index:'comm_percent',value:commissions[i]['Comm %']},
									{index:'premium',value:commissions[i]['Net Premuim']},
									{index:'issue_date',value:commissions[i].issue_date},
									{index:'issuer',value:commissions[i].issuer},
									{index:'commission_type',value:commissions[i].commission_type},
									{index:'agent',value:commissions[i].agent},
									{index:'last_updated',value:last_updated}];

						create_comm_json.data.push(data_json_array);
					}
				}
				create_batch_json(create_comm_json);
			});
		};

	</script>
</div>
