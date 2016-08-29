<div id='report123' class='tab-pane portlet box red-sunglo'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='report123_ini();'>Refresh</a>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick=report123_add_filter();>Add Filter</a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
					<li>
                        <a id='report123_print'><i class='fa fa-print'></i> Print</a>
                    </li>
					<li>
                        <a id='report123_pdf'><i class='fa fa-file-pdf-o'></i> Download as PDF</a>
                    </li>
                    <li>
                        <a id='report123_email'><i class='fa fa-envelope'></i> Email</a>
                    </li>
					<li class="divider"> </li>
                    <li>
                        <a id='report123_upload' onclick=report123_popup_import_action();><i class='fa fa-upload'></i> Import</a>
                    </li>
                </ul>
            </div>
        </div>
	</div>

	<div class="portlet-body">
		<form id='report123_header' autocomplete="off">
			<input type='submit' class='submit_hidden'>
			<fieldset id='report123_filters'></fieldset>
		</form>
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<th>Issuing Company</th>
		            <th>Agent</th>
					<th>Policy #</th>
					<th>Premium</th>
					<th>Basic Comm.</th>
					<th>ORC Comm.</th>
				</tr>
			</thead>
			<tbody id='report123_body'></tbody>
		</table>
	</div>

	<div class='modal_forms'>

	<a href='#report123_popup' data-toggle="modal" id='report123_popup_link'></a>
		<div id="report123_popup" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<form id='report123_popup_form' autocomplete="off">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
							<h4 class="modal-title">Valdiation Failed</h4>
						</div>
						<div class="modal-body">
							<div id='report123_popup_message' class="scroller" style="height:100px;" data-always-visible="1" data-rail-visible1="1">
								Validation Failed!
							</div>
						</div>
						<div class="modal-footer">
							<input type="button" class="btn green" data-dismiss='modal' name='close' value='Ok'>
						</div>
					</form>
				</div>
			</div>
		</div>

		<a href='#report123_popup_import' data-toggle="modal" id='report123_popup_import_link'></a>
		<div id="report123_popup_import" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<form id='report123_popup_import_form' autocomplete="off">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
							<h4 class="modal-title">Data Import</h4>
						</div>
						<div class="modal-body">
							<div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
							  <div class="row">
								  <div class="col-sm-12 col-md-4">Import Type</div>
								  <div class="col-sm-12 col-md-8"><input type='text' required form='report123_popup_import_form' name='type'></div>
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
							<button type="submit" class="btn green" form='report123_popup_import_form' name='save'>Import</button>
							<button type="button" class="btn red" form='report123_popup_import_form' data-dismiss='modal' name='cancel'>Cancel</button>
						</div>
					</form>
				</div>
			</div>
		</div>

	</div>

	<script>

	function report123_add_filter()
	{
		var form=document.getElementById('report123_header');
		var f_filter=document.createElement('input');
		f_filter.type='text';
		f_filter.placeholder='Filter By';
		f_filter.className='floatlabel';
		f_filter.setAttribute('data-name','f');

		var v_filter=document.createElement('input');
		v_filter.type='text';
		v_filter.placeholder='Filter Value';
		v_filter.className='floatlabel';
		v_filter.setAttribute('data-name','v');

		var i_filter=document.createElement('input');
		i_filter.type='hidden';
		i_filter.setAttribute('data-name','i');
		i_filter.value='status';

		var from_filter=document.createElement('input');
		from_filter.type='text';
		from_filter.placeholder='From Date';
		from_filter.className='floatlabel';
		from_filter.setAttribute('data-name','from');

		var to_filter=document.createElement('input');
		to_filter.type='text';
		to_filter.placeholder='To Date';
		to_filter.className='floatlabel';
		to_filter.setAttribute('data-name','to');

		var remove_link = document.createElement('a');
		remove_link.onclick = function(){
			$(this).parent().parent().remove();
		};
		remove_link.style="vertical-align:top";
		remove_link.title="Remove Filter";
		remove_link.innerHTML = "<i class='fa fa-times' style='font-size:25px;margin-top:20px;'></i>";

		var row=document.createElement('div');
		row.className='row';
		var col=document.createElement('div');
		col.className='col-md-12';

		var label1=document.createElement('label');
		var label2=document.createElement('label');
		var label3=document.createElement('label');
		var label4=document.createElement('label');
		// var label5=document.createElement('label');

		row.appendChild(col);
		col.appendChild(label1);
		col.appendChild(label2);
		col.appendChild(label3);
		col.appendChild(label4);
		col.appendChild(remove_link);

		label1.appendChild(f_filter);
		label2.appendChild(v_filter);
		label3.appendChild(from_filter);
		label4.appendChild(to_filter);
		// label5.appendChild(remove_link);
		col.appendChild(i_filter);

		var fieldset=document.getElementById('report123_filters');
		fieldset.appendChild(row);

		var data=['Application #','Policy #','Issue Type','End Date','Start Date','Issue Date',
					'Tele Caller','Sales Manager','Team Lead','Agent','Issuing Company',
					'Policy Name','Policy Holder','Preferred','Term'];
		set_value_list_json(data,f_filter);

		$(from_filter).datepicker();
		$(to_filter).datepicker();

		function s(x){
			if(!vUtil.isBlank(x) && x=='d'){
				$(from_filter).show();
				$(to_filter).show();
				$(v_filter).hide();
				$('#report123').formcontrol();
			}else{
				$(from_filter).hide();
				$(to_filter).hide();
				$(v_filter).show();
				var value_data={data_store:'policies',return_column:i_filter.value};
				set_my_filter_json(value_data,v_filter);
			}
			v_filter.value="";
			from_filter.value="";
			to_filter.value="";
		}

		s();
		vUtil.onChange(f_filter,function()
		{
			switch(f_filter.value)
			{
				case 'Application #': i_filter.value = 'application_num'; s(); break;
				case 'Policy #': i_filter.value = 'policy_num'; s(); break;
				case 'Issue Type': i_filter.value = 'issue_type'; s(); break;
				case 'End Date':  i_filter.value = 'end_date'; s('d'); break;
				case 'Start Date':  i_filter.value = 'start_date'; s('d'); break;
				case 'Issue Date':  i_filter.value = 'issue_date'; s('d'); break;
				case 'Tele Caller': i_filter.value = 'tele_caller'; s(); break;
				case 'Sales Manager': i_filter.value = 'sales_manager'; s(); break;
				case 'Team Lead': i_filter.value = 'team_lead'; s(); break;
				case 'Agent': i_filter.value = 'agent'; s(); break;
				case 'Issuing Company': i_filter.value = 'issuer'; s(); break;
				case 'Policy Name': i_filter.value = 'policy_name'; s(); break;
				case 'Policy Holder': i_filter.value = 'policy_holder'; s(); break;
				case 'Preferred': i_filter.value = 'preferred'; s(); break;
				case 'Term': i_filter.value = 'term'; s(); break;
				default: i_filter.value = 'status'; s();
			}
		});
		$('#report123').formcontrol();
	}

    function report123_header_ini()
    {
		var form=document.getElementById('report123_header');
		$('#report123_filters').html('');
		report123_add_filter();

		$(form).off('submit');
        $(form).on('submit',function(event)
        {
            event.preventDefault();
            report123_ini();
        });

        setTimeout(function(){$('#report123').formcontrol();},500);
    }

    function report123_ini()
    {
        var form=document.getElementById('report123_header');

        show_loader();
        $('#report123_body').html('');

        var paginator=$('#report123_body').paginator({'page_size':50});

        var columns={count:paginator.page_size(),
                    start_index:paginator.get_index(),
                    data_store:'policies',
					indexes:[{index:'id'},
                        {index:'issuer'},
                        {index:'agent'},
						{index:'premium'},
						{index:'policy_num'},
						{index:'policy_name'},
						{index:'sum_insured'},
						{index:'term'},
						{index:'upsell'},
						{index:'issue_type'},
						{index:'issued_in_quarter'},
						{index:'status',exact:'issued'}]};

		$('#report123_filters .row').each(function(index)
		{
			var row = this;
			var f_filter = $(this).find("input[data-name='f']").val();
			var v_filter = $(this).find("input[data-name='v']").val();
			var i_filter = $(this).find("input[data-name='i']").val();
			var from_filter = $(this).find("input[data-name='from']").val();
			var to_filter = $(this).find("input[data-name='to']").val();

			if(!vUtil.isBlank(v_filter)){
				columns.indexes.push({index:i_filter,value:v_filter});
			}
			else{
				if(!vUtil.isBlank(from_filter)){
					columns.indexes.push({index:i_filter,lowerbound:vTime.unix({date:from_filter})});
				}
			 	if(!vUtil.isBlank(to_filter)){
					columns.indexes.push({index:i_filter,upperbound:vTime.unix({date:to_filter})});
				}
			}
		});

		read_json_rows('report123',columns,function(policies)
        {
			var policy_numbers = vUtil.arrayColumn(policies,'policy_num');

			var imported_data={data_store:'policy_commissions_imported',
							indexes:[{index:'policy_num',array:policy_numbers},
									{index:'comm_percent'},
									{index:'amount'},
									{index:'commission_type'}]};
			read_json_rows('report123',imported_data,function(imported_commissions)
	        {
				var commissions_data={data_store:'policy_commissions',
									indexes:[{index:'policy_num',array:policy_numbers},
											{index:'comm_percent'},
											{index:'amount'},
											{index:'commission_type'}]};
				read_json_rows('report123',commissions_data,function(commissions)
				{
					for(var a in policies)
					{
						for(var i in commissions)
						{
							if(policies[a].policy_num==commissions[i].policy_num)
							{
								policies[a][commissions[i].commission_type] = commissions[i].amount;
								policies[a][commissions[i].commission_type+"_percent"] = commissions[i].comm_percent;
							}
						}

						for(var j in imported_commissions)
						{
							if(policies[a].policy_num==imported_commissions[j].policy_num)
							{
								policies[a]["imported_"+imported_commissions[j].commission_type] = imported_commissions[j].amount;
								policies[a]["imported_"+imported_commissions[j].commission_type+"_percent"] = imported_commissions[j].comm_percent;
							}
						}

						if(vUtil.isBlank(policies[a]['basic']))
						{
							policies[a]['basic_notes']="Commission could not be calculated for this policy. Please check policy bank settings.";
							policies[a]['basic_label']="label-warning";
						}
						else if(vUtil.isBlank(policies[a]['imported_basic']))
						{
							policies[a]['basic_notes']="No validation reports have been imported against this policy.";
							policies[a]['basic_label']="label-default";
						}
						else if(vUtil.round(vUtil.isBlank(policies[a]['basic']))!=vUtil.round(vUtil.isBlank(policies[a]['imported_basic'])))
						{
							policies[a]['basic_notes']="Commission amount doesn't match imported report. Please check.";
							policies[a]['basic_label']="label-danger";
						}
						else{
							policies[a]['basic_notes']="Match";
							policies[a]['basic_label']="label-success";
						}

						if(vUtil.isBlank(policies[a]['orc']))
						{
							policies[a]['orc_notes']="Commission could not be calculated for this policy. Please check policy bank settings.";
							policies[a]['orc_label']="label-warning";
						}
						else if(vUtil.isBlank(policies[a]['imported_orc']))
						{
							policies[a]['orc_notes']="No validation reports have been imported against this policy.";
							policies[a]['orc_label']="label-default";
						}
						else if(vUtil.round(vUtil.isBlank(policies[a]['orc']))!=vUtil.round(vUtil.isBlank(policies[a]['imported_orc'])))
						{
							policies[a]['orc_notes']="Commission amount doesn't match imported report. Please check.";
							policies[a]['orc_label']="label-danger";
						}
						else{
							policies[a]['orc_notes']="Match";
							policies[a]['orc_label']="label-success";
						}
					}
					// console.log(policies);
		            policies.forEach(function(item)
		            {
						var rowsHTML="<tr>";
		                rowsHTML+="<form id='report123_"+item.id+"'></form>";
		                rowsHTML+="<td data-th='Issuing Company'>";
							rowsHTML+=item.issuer;
		                rowsHTML+="</td>";
						rowsHTML+="<td data-th='Agent'>";
							rowsHTML+=item.agent;
		                rowsHTML+="</td>";
						rowsHTML+="<td data-th='Policy #'>";
							rowsHTML+="<a onclick=\"show_object('policies','"+item.policy_num+"');\">"+item.policy_num+"</a>";
		                rowsHTML+="</td>";
						rowsHTML+="<td data-th='Premium'>";
							rowsHTML+=item.premium;
		                rowsHTML+="</td>";
						rowsHTML+="<td data-th='Basic Comm.'>";
							rowsHTML+="<span class='label label-sm "+item.basic_label+"' id='report123_basic_"+item.id+"' title='"+item.basic_notes+"'>"+item.basic+"</span>";
		                rowsHTML+="</td>";
						rowsHTML+="<td data-th='ORC Comm.'>";
							rowsHTML+="<span class='label label-sm "+item.orc_label+"' id='report123_orc_"+item.id+"' title='"+item.orc_notes+"'>"+item.orc+"</span>";
						rowsHTML+="</td>";
						rowsHTML+="</tr>";

						$('#report123_body').append(rowsHTML);
		            });

					initialize_static_tabular_report_buttons('Commissions Validation','report123');

		            paginator.update_index(policies.length);
		            hide_loader();
				});
			});
        });
    };

	/**
	* This function inflates the policy data in the commission
	*/
	function report123_policy_details(commissions,policy_num_index,issuer,func)
	{
		var policy_nums = vUtil.arrayColumn(commissions,policy_num_index);
		var policy_data  = {data_store:'policies',indexes:[{index:'id'},
						{index:'policy_num',array:policy_nums},
						{index:'issuer',exact:issuer},
						{index:'agent'},
						{index:'issue_date'}]};
		read_json_rows('report123',policy_data,function(ids)
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

	function report123_popup_import_action()
	{
		var form=document.getElementById('report123_popup_import_form');

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
			report123_import_template(import_type.value);
		});

		$(form).off('submit');
		$(form).on('submit',function(event)
		{
			event.preventDefault();

			vImport.readFile(select_file,function(content)
			{
				switch(import_type.value){
					case 'Apollo Basic':vImport.importData(content,form,report123_ab_import,report123_ab_import_validate);
											break;
					case 'Apollo ORC':vImport.importData(content,form,report123_ao_import,report123_ao_import_validate);
											break;
					case 'ICICI Basic':vImport.importData(content,form,report123_ib_import,report123_ib_import_validate);
											break;
					case 'ICICI ORC':vImport.importData(content,form,report123_io_import,report123_io_import_validate);
											break;
					case 'Max Basic':vImport.importData(content,form,report123_mb_import,report123_mb_import_validate);
											break;
					case 'Max ORC':vImport.importData(content,form,report123_mo_import,report123_mo_import_validate);
											break;
					case 'Star Basic':vImport.importData(content,form,report123_sb_import,report123_sb_import_validate);
											break;
					case 'Star ORC':vImport.importData(content,form,report123_so_import,report123_so_import_validate);
											break;
				}
			});
		});
		$("#report123_popup_import_link").click();
	}


	function report123_import_template(import_type)
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
			case 'ICICI Basic':data_array=['IssueStatus','IssueDate','CustomerName','PolicyNumber','NetGWP',
										'ServiceTax','EducationCess','PremiumForPayout','CommissionPercentage',
										'AgentCommission','TDS','NetAmt','RmName','AgentLocation','FinalVertical'];
								break;
			case 'ICICI ORC':data_array=[];
								break;
			case 'Max Basic':data_array=['Policy Number','Customer Id','Customer Name','Agent Code',
										'Gwp(Before Tax)','Commission Structure','Service Tax','TDS','Net Payment',
										'Agent Type','Agent Name','Agent Branch','Bank Name','Account Number',
										'Bank Branch','Bank City','Pan Number','Licence Expiry Date','Email',
										'Payment Status','IFSC Code','Cheque Number','Cheque Date'];
								break;
			case 'Max ORC': data_array=[];
											break;
			case 'Star Basic':data_array=[];
											break;
			case 'Star ORC':data_array=[];
									break;
		}
		vUtil.arrayToCSV(data_array);
	};

	/**
	*	Import validation for apollo basic commissions
	*/
	function report123_ab_import_validate(data_array)
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
	function report123_ab_import(commissions)
	{
		var create_comm_json={data_store:'policy_commissions_imported',log:'yes',data:[],
						log_data:{title:'Basic Commissions from Apollo',link_to:'report123'}};

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

		report123_policy_details(commissions,'policy_num','Apollo',function()
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


	/**
	*	Import validation for Max basic commissions
	*/
	function report123_mb_import_validate(data_array)
	{
		var validate_template_array=[{column:'Policy Number',required:'yes',regex:new RegExp('^[0-9a-zA-Z_-]+$')},
								{column:'Customer Id',regex:new RegExp('^[0-9a-zA-Z _.,()-]+$')},
								{column:'Customer Name',required:'yes',regex:new RegExp('^[0-9a-zA-Z _.,()-]+$')},
								{column:'Agent Code',regex:new RegExp('^[0-9a-zA-Z _.,()-]+$')},
								{column:'Gwp(Before Tax)',required:'yes',regex:new RegExp('^[0-9 .-]+$')},
								{column:'Commission Structure',required:'yes',regex:new RegExp('^[0-9 .-]+$')},
								{column:'Service Tax',required:'yes',regex:new RegExp('^[0-9 .-]+$')},
								{column:'TDS',required:'yes',regex:new RegExp('^[0-9 .-]+$')},
								{column:'Net Payment',required:'yes',regex:new RegExp('^[0-9 .-]+$')},
								{column:'Agent Type',regex:new RegExp('^[0-9a-zA-Z _.,()-]+$')},
								{column:'Agent Name',regex:new RegExp('^[0-9a-zA-Z _.,()-]+$')},
								{column:'Agent Branch',regex:new RegExp('^[0-9a-zA-Z _.,()-]+$')},
								{column:'Bank Name',regex:new RegExp('^[0-9a-zA-Z _.,()-]+$')},
								{column:'Account Number',regex:new RegExp('^[0-9a-zA-Z _.,()-]+$')},
								{column:'Bank Branch',regex:new RegExp('^[0-9a-zA-Z _.,()-]+$')},
								{column:'Bank City',regex:new RegExp('^[0-9a-zA-Z _.,()-]+$')},
								{column:'Pan Number',regex:new RegExp('^[0-9a-zA-Z _.,()-]+$')},
								{column:'Licence Expiry Date',regex:new RegExp('^[0-9]{1,2}\-[a-zA-Z]{3}\-[0-9]{2}')},
								{column:'Email',regex:new RegExp('^[0-9a-zA-Z _.,()@-]+$')},
								{column:'Payment Status',regex:new RegExp('^[0-9a-zA-Z _.,()-]+$')},
								{column:'IFSC Code',regex:new RegExp('^[0-9a-zA-Z _.,()-]+$')},
								{column:'Cheque Number',regex:new RegExp('^[0-9a-zA-Z _.,()-]+$')}];

		var error_array=vImport.validate(data_array,validate_template_array);
		return error_array;
	}

	/**
	*	Import for Max basic commissions
	*/
	function report123_mb_import(commissions)
	{
		var create_comm_json={data_store:'policy_commissions_imported',log:'yes',data:[],
						log_data:{title:'Basic Commissions from Max',link_to:'report123'}};

		var counter=1;
		var last_updated=vTime.unix();
		show_loader();

		for(var a in commissions)
		{
			commissions[a].policy_num=commissions[a]['Policy Number'];
			commissions[a].issue_date="";
			commissions[a].issuer="Max";
			commissions[a].commission_type="basic";
			commissions[a].agent="";
			commissions[a].import=false;
			commissions[a].comm_percent= (vUtil.isBlank(commissions[a]['Gwp(Before Tax)']) || commissions[a]['Gwp(Before Tax)']==0) ? 0 : vUtil.round((100*commissions[a]['Commission Structure']/commissions[a]['Gwp(Before Tax)']),2) ;
		}

		report123_policy_details(commissions,'policy_num','Max',function()
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
								{index:'amount',value:commissions[i]['Commission Structure']},
								{index:'comm_percent',value:commissions[i]['comm_percent']},
								{index:'premium',value:commissions[i]['Gwp(Before Tax)']},
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

	/**
	*	Import validation for ICICI basic commissions
	*/
	function report123_ib_import_validate(data_array)
	{
		var validate_template_array=[{column:'IssueStatus',regex:new RegExp('^[0-9a-zA-Z_-]+$')},
								{column:'IssueDate',required:'yes',regex:new RegExp('^[0-9a-zA-Z _.,()-]+$')},
								{column:'CustomerName',required:'yes',regex:new RegExp('^[0-9a-zA-Z _.,()-]+$')},
								{column:'PolicyNumber',required:'yes',regex:new RegExp('^[0-9a-zA-Z _.,/()-]+$')},
								{column:'NetGWP',required:'yes',regex:new RegExp('^[0-9 .-]+$')},
								{column:'ServiceTax',required:'yes',regex:new RegExp('^[0-9 .-]+$')},
								{column:'EducationCess',regex:new RegExp('^[0-9 .-]+$')},
								{column:'PremiumForPayout',required:'yes',regex:new RegExp('^[0-9 .-]+$')},
								{column:'CommissionPercentage',required:'yes',regex:new RegExp('^[0-9 .-]+$')},
								{column:'AgentCommission',required:'yes',regex:new RegExp('^[0-9 .-]+$')},
								{column:'TDS',required:'yes',regex:new RegExp('^[0-9 .-]+$')},
								{column:'NetAmt',required:'yes',regex:new RegExp('^[0-9 .-]+$')},
								{column:'RmName',regex:new RegExp('^[0-9a-zA-Z _.,()-]+$')},
								{column:'AgentLocation',regex:new RegExp('^[0-9a-zA-Z _.,()-]+$')},
								{column:'FinalVertical',regex:new RegExp('^[0-9a-zA-Z _.,()-]+$')}];

		var error_array=vImport.validate(data_array,validate_template_array);
		return error_array;
	}

	/**
	*	Import for ICICI basic commissions
	*/
	function report123_ib_import(commissions)
	{
		var create_comm_json={data_store:'policy_commissions_imported',log:'yes',data:[],
						log_data:{title:'Basic Commissions from Max',link_to:'report123'}};

		var counter=1;
		var last_updated=vTime.unix();
		show_loader();

		for(var a in commissions)
		{
			commissions[a].policy_num=commissions[a]['PolicyNumber'];
			commissions[a].issue_date="";
			commissions[a].issuer="ICICI";
			commissions[a].commission_type="basic";
			commissions[a].agent="";
			commissions[a].import=false;
		}

		report123_policy_details(commissions,'policy_num','ICICI',function()
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
								{index:'amount',value:commissions[i]['AgentCommission']},
								{index:'comm_percent',value:commissions[i]['CommissionPercentage']},
								{index:'premium',value:commissions[i]['PremiumForPayout']},
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
