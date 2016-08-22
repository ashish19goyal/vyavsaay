<div id='form347' class='tab-pane portlet box yellow-saffron'>
	<div class="portlet-title">
		<div class='caption'>
			<div class='btn-group' id='form347_status' data-toggle='buttons'>
				<label class='btn yellow-crusta issued active' onclick=form347_ini('issued');><input name='issued' type='radio' class='toggle'>Issued</label>
				<label class='btn yellow-crusta applied' onclick=form347_ini('applied');><input type='radio' name='applied' class='toggle'>Applied</label>
			</div>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
					<li>
                        <a id='form347_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form347_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form347_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li class="divider"> </li>
                    <li>
                        <a id='form347_upload' onclick=form347_popup_import_action();><i class='fa fa-upload'></i> Import</a>
                    </li>
                </ul>
            </div>
        </div>
	</div>

	<div class="portlet-body">
		<form id='form347_header' autocomplete="off">
			<label style='float:right;'><button type='button' class='btn red-pink' onclick='modal11_action();' title='Add Customer'><i class='fa fa-plus'></i> Add Customer</button></label>
			<label style='float:right;'><button type='button' class='btn purple-soft' onclick='modal216_action();' title='Add Policy'><i class='fa fa-plus'></i> Add Policy</button></label>
			<label style='float:right;'><button type='button' class='btn yellow-saffron' onclick='form347_add_filter();' title='Add Filter'><i class='fa fa-plus'></i> Add Filter</button></label>
			<input type='submit' class='submit_hidden'>
			<fieldset id='form347_filters'></fieldset>
		</form>

		<br>
		<div id='form347_body' class='row'></div>
	</div>

	<div class='modal_forms'>
		<a href='#form347_popup' data-toggle="modal" id='form347_popup_link'></a>
		<div id="form347_popup" class="modal fade draggable-modal" role="basic" tabindex="-1" aria-hidden="true">
	        <div class="modal-dialog modal-full">
	            <div class="modal-content">
	                <form id='form347_popup_form' autocomplete="off">
		            	<div class="modal-header">
	                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
	                    	<h4 class="modal-title">Edit Dependants</h4>
	                	</div>
		                <div class="modal-body">
			               <div class="scroller" style="height:80%;" data-always-visible="1" data-rail-visible1="1">
			                 <form id='form347_popup_form' autocomplete="off">
								<fieldset>
									<button type="button" class='btn green' name='add_button'><i class='fa fa-plus'></i></button>
									<div id='form347_popup_columns'></div>
								</fieldset>
							 </form>
			               </div>
			             </div>
		             	<div class="modal-footer">
		               	<button type="submit" class="btn green" form='form347_popup_form' name='save'>Save</button>
		             	</div>
	                </form>
	            </div>
	        </div>
	    </div>

		<a href='#form347_popup_import' data-toggle="modal" id='form347_popup_import_link'></a>
		<div id="form347_popup_import" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
	        <div class="modal-dialog">
	            <div class="modal-content">
	                <form id='form347_popup_import_form' autocomplete="off">
		            	<div class="modal-header">
	                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
	                    	<h4 class="modal-title">Data Import</h4>
	                	</div>
		                <div class="modal-body">
			              	<div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
							  <div class="row">
							  	  <div class="col-sm-12 col-md-4">Import Type</div>
								  <div class="col-sm-12 col-md-8"><input type='text' required form='form347_popup_import_form' name='type'></div>
  							  </div>
							  <div class="row">
							  	  <div class="col-sm-12 col-md-4">Agent</div>
								  <div class="col-sm-12 col-md-8"><input type='text' required form='form347_popup_import_form' name='agent'></div>
  							  </div>
						      <div class="row">
								  <div class='col-md-6'>
								 		<button type='button' name='file_dummy' class='btn red-sunglo'>Select File</button>
								  </div>
								  <div class='col-md-6'>
										<button type="button" name='download' style='margin-bottom:10px;' class='btn green-jungle'>Download Import Template</button>
								  </div>
					          </div>
			            	</div>
			            </div>
		             	<div class="modal-footer">
		               		<button type="submit" class="btn green" form='form347_popup_import_form' name='save'>Import</button>
		               		<button type="button" class="btn red" form='form347_popup_import_form' data-dismiss='modal' name='cancel'>Cancel</button>
		             	</div>
	                </form>
	            </div>
	        </div>
	    </div>

	</div>

    <script>

	function form347_add_filter()
	{
		var form=document.getElementById('form347_header');
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

		var fieldset=document.getElementById('form347_filters');
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
				$('#form347').formcontrol();
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
		$('#form347').formcontrol();
	}


        function form347_header_ini()
        {
            var filter_fields=document.getElementById('form347_header');
			$('#form347_filters').html('');
			form347_add_filter();

			$(filter_fields).off('submit');
            $(filter_fields).on('submit',function(event)
            {
                event.preventDefault();
                form347_ini();
            });
        };

        function form347_ini(policy_type)
        {
            show_loader();
            var fid=$("#form347_link").attr('data_id');
            if(fid==null)
                fid="";

            $('#form347_body').html("");

			var status_filter='issued';
			if(typeof policy_type!='undefined' && policy_type=='applied')
			{
				status_filter='applied';
			  	$('#form347_status').find('label.applied').addClass('active');
			  	$('#form347_status').find('label.issued').removeClass('active');
			}
			else
			{
			  	$('#form347_status').find('label.issued').addClass('active');
			  	$('#form347_status').find('label.applied').removeClass('active');
		  	}

            var paginator=$('#form347_body').paginator({'page_size':24});

			var columns={count:paginator.page_size(),
						start_index:paginator.get_index(),
						data_store:'policies',
						indexes:[{index:'id',value:fid},
								{index:'application_num'},
								{index:'policy_num'},
								{index:'policy_holder'},
								{index:'agent'},
								{index:'status',exact:status_filter},
								{index:'issuer'}]};

			$('#form347_filters .row').each(function(index)
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

            read_json_rows('form347',columns,function(results)
            {
                counter=0;
                results.forEach(function(result)
                {
                    var clear_both="";
					if((counter%4)==0)
					{
						clear_both="style='clear:both;'";
					}
					counter++;

                    var rowsHTML="<div class='col-xs-6 col-sm-3 col-md-3' "+clear_both+">"+
									"<div class='thumbnail'>"+
                                 	      "<div class='caption'>"+
                                    	     "<form id='form347_"+result.id+"'>"+
													"<textarea readonly='readonly' name='app_num' class='floatlabel' placeholder='Application #' form='form347_"+result.id+"'>"+result.application_num+"</textarea>"+
													"<a onclick=\"show_object('policies','"+result.policy_num+"','"+result.id+"');\"><textarea readonly='readonly' name='name' class='floatlabel' placeholder='Policy #' form='form347_"+result.id+"'>"+result.policy_num+"</textarea></a>"+
	                                              	"<a onclick=\"show_object('customers','"+result.policy_holder+"');\"><textarea readonly='readonly' class='floatlabel' placeholder='Holder' name='holder' form='form347_"+result.id+"'>"+result.policy_holder+"</textarea></a>"+
													"<input type='text' readonly='readonly' class='floatlabel' placeholder='Provider' name='provider' form='form347_"+result.id+"' value='"+result.issuer+"'>"+
													"<input type='text' readonly='readonly' class='floatlabel' placeholder='Agent' name='agent' form='form347_"+result.id+"' value='"+result.agent+"'>"+
													"<input type='hidden' form='form347_"+result.id+"' name='id' value='"+result.id+"'>"+
	           	    							    "<button type='button' class='btn red' form='form347_"+result.id+"' name='delete' title='Delete' onclick='form347_delete_item($(this));'><i class='fa fa-2x fa-trash'></i></button>"+
													"<button type='button' class='btn green' form='form347_"+result.id+"' name='dependents' title='Add or Edit Dependants' onclick=\"form347_popup_action('"+result.id+"','"+result.policy_holder+"');\"><i class='fa fa-2x fa-users'></i></button>"+
											"</form>"+
                                 	    "</div>"+
                               	    "</div>"+
                                "</div>";

                    $('#form347_body').append(rowsHTML);
                });

                $('#form347').formcontrol();
				paginator.update_index(results.length);
				hide_loader();
				initialize_tabular_report_buttons(columns,'Policies','form347',function (item){});
            });
        };

        function form347_delete_item(button)
        {
            if(is_delete_access('form347'))
            {
                modal115_action(function()
                {
                    var form_id=$(button).attr('form');
                    var form=document.getElementById(form_id);

                    var policy_num=form.elements['name'].value;
                    var data_id=form.elements['id'].value;

                    var data_json={data_store:'policies',
		 				data:[{index:'id',value:data_id}],
		 				log:'yes',
		 				log_data:{title:'Deleted',notes:'Policy # '+policy_num,link_to:'form347'}};

                    delete_json(data_json);
                    $(button).parent().parent().parent().parent().remove();
                });
            }
            else
            {
                $("#modal2_link").click();
            }
        }


		function form347_policy_holder_ids(policies,policy_holder_index,func)
		{
			var policy_holders = vUtil.arrayColumn(policies,policy_holder_index);
			var id_data  = {data_store:'customers',indexes:[{index:'id'},
							{index:'acc_name',array:policy_holders}]};
			read_json_rows('form347',id_data,function(ids)
			{
				ids.forEach(function(id)
				{
					for(var i in policies)
					{
						if(policies[i][policy_holder_index]==id['acc_name'])
						{
							policies[i].policy_holder_id = id['id'];
							break;
						}
					}
				});
				// console.log(policies);
				func();
			});
		}

		function form347_policy_ids_by_name(policies,names_index,policy_name_index,issuer,func)
		{
			var holder_names = vUtil.arrayColumn(policies,names_index);
			var id_data  = {data_store:'policies',indexes:[{index:'id'},
							{index:'policy_holder',approx_array:holder_names},
							{index:'policy_num',exact:""},
							{index:'policy_name'},
							{index:'issuer',value:issuer}]};
			read_json_rows('form347',id_data,function(ids)
			{
				ids.forEach(function(id)
				{
					for(var i in policies)
					{
						if(id['policy_holder'].indexOf(policies[i][names_index])>-1 && id['policy_name'].toLowerCase()==policies[i][policy_name_index].toLowerCase())
						{
							policies[i].id = id['id'];
							policies[i].policy_holder = id['policy_holder'];
							break;
						}
					}
				});
				func();
			});
		}

		function form347_renewed_policy_ids_by_name(policies,names_index,issuer,func)
		{
			var holder_names = vUtil.arrayColumn(policies,names_index);
			var id_data  = {data_store:'policies',indexes:[{index:'id'},
							{index:'policy_holder',approx_array:holder_names},
							{index:'policy_num'},
							{index:'end_date'},
							{index:'premium'},
							{index:'issuer',value:issuer}]};
			read_json_rows('form347',id_data,function(ids)
			{
				ids.forEach(function(id)
				{
					for(var i in policies)
					{
						var time_difference = parseFloat(id['end_time'])-parseFloat(policies[i]['issue_time']);
						var match = (time_difference <= 2*86400000 && time_difference >= -2*86400000)? true : false;
						if(id['policy_holder'].indexOf(policies[i][names_index])>-1 && match)
						{
							policies[i].application_num = id['policy_num'];
							policies[i].policy_holder = id['policy_holder'];
							policies[i].old_premium = id['premium'];
							break;
						}
					}
				});
				func();
			});
		}

		function form347_policy_ids_by_name_phone(policies,issuer,func)
		{
			var holder_names = vUtil.arrayColumn(policies,'Assured Name');

			var holder_phones = vUtil.arrayColumn(policies,'Telephone No');
			for(var i in holder_phones)
			{
				var phones = holder_phones[i].split("/");
				phones.forEach(function(phone)
				{
					if(phone!="NA" && phone!="na" && !vUtil.isBlank(phone))
					{
						holder_names.push(phone);
					}
				});
			}

			var id_data  = {data_store:'policies',indexes:[{index:'id'},
							{index:'policy_holder',approx_array:holder_names},
							{index:'policy_num',exact:''},
							{index:'policy_name'},
							{index:'issuer',value:issuer}]};
			read_json_rows('form347',id_data,function(ids)
			{
				ids.forEach(function(id)
				{
					for(var i in policies)
					{
						if(id['policy_holder'].indexOf(policies[i]['Assured Name'])>-1 && id['policy_name'].toLowerCase()==policies[i]['Product'].toLowerCase())
						{
							policies[i].id = id['id'];
							policies[i].application_num = id['application_num'];
							policies[i].policy_holder = id['policy_holder'];
							break;
						}
					}
				});
				func();
			});
		}

		function form347_renewal_policy_details_name_phone(policies,issuer,func)
		{
			var old_policies = vUtil.arrayColumn(policies,'Previous Policy Number');

			var id_data  = {data_store:'policies',indexes:[{index:'id'},
							{index:'policy_holder'},
							{index:'policy_num',array:old_policies},
							{index:'premium'},
							{index:'issuer',value:issuer}]};
			read_json_rows('form347',id_data,function(ids)
			{
				ids.forEach(function(id)
				{
					for(var i in policies)
					{
						if(id['policy_num']==policies[i]['Previous Policy Number'])
						{
							policies[i].policy_holder = id['policy_holder'];
							policies[i].old_premium = id['premium'];
							break;
						}
					}
				});
				func();
			});
		}

		function form347_policy_ids(policies,policy_num_index,issuer,func)
		{
			var policy_nums = vUtil.arrayColumn(policies,policy_num_index);
			var id_data  = {data_store:'policies',indexes:[{index:'id'},
							{index:'policy_holder'},
							{index:'policy_num',array:policy_nums},
							{index:'issuer',value:issuer}]};
			read_json_rows('form347',id_data,function(ids)
			{
				ids.forEach(function(id)
				{
					for(var i in policies)
					{
						if(policies[i][policy_num_index]==id['policy_num'])
						{
							policies[i].id = id['id'];
							policies[i].policy_holder = id['policy_holder'];
							break;
						}
					}
				});
				// console.log(policies);
				func();
			});
		}

		function form347_application_ids(policies,app_num_index,issuer,func)
		{
			var app_nums = vUtil.arrayColumn(policies,app_num_index);
			var id_data  = {data_store:'policies',indexes:[{index:'id'},
							{index:'policy_holder'},
							{index:'application_num',array:app_nums},
							{index:'issuer',value:issuer}]};
			read_json_rows('form347',id_data,function(ids)
			{
				// console.log(ids);
				ids.forEach(function(id)
				{
					for(var i in policies)
					{
						if(policies[i][app_num_index]==id['application_num'])
						{
							policies[i].id = id['id'];
							policies[i].policy_holder = id['policy_holder'];
							break;
						}
					}
				});

				var renewal_data  = {data_store:'policies',indexes:[{index:'id'},
								{index:'policy_holder'},
								{index:'premium'},
								{index:'policy_num',array:app_nums},
								{index:'issuer',value:issuer}]};
				read_json_rows('form347',renewal_data,function(ids)
				{
					// console.log(ids);
					ids.forEach(function(id)
					{
						for(var i in policies)
						{
							if(policies[i][app_num_index]==id['policy_num'])
							{
								policies[i].policy_holder = id['policy_holder'];
								policies[i].issue_type = 'renewal';
								policies[i].old_premium = id.premium;
							}
						}
					});
					func();
				});
			});
		}

		function form347_policy_bank(policies,policy_name_index,issuer,func)
		{
			var bank_data  = {data_store:'policy_types',all_indexes:'yes',indexes:[{index:'issuer',value:issuer}]};
			read_json_rows('form347',bank_data,function(banks)
			{
				banks.forEach(function(policy)
				{
					for(var i in policies)
					{
						if(policies[i][policy_name_index].toLowerCase()==policy['name'].toLowerCase())
						{
							policies[i].description = policy['description'];
							policies[i].type = policy['type'];
							policies[i].preferred = policy['preferred'];
						}
					}
				});
				func();
			});
		}

		function form347_popup_action(policy_id,customer_name)
		{
			var form=document.getElementById('form347_popup_form');
			var add_button=form.elements['add_button'];

			var attribute_label=document.getElementById('form347_popup_columns');
			attribute_label.innerHTML="";

			$(add_button).off('click');
			$(add_button).on('click',function ()
			{
				var id=get_new_key();
				var content="<div class='row' id='form347_popup_"+id+"'>"+
								"<div class='col-md-5'>"+
									"<input placeholder='Name' class='floatlabel' name='name' type='text'>"+
								"</div>"+
								"<div class='col-md-4'>"+
									"<input placeholder='Relation' class='floatlabel' name='relation' type='text'>"+
								"</div>"+
								"<div class='col-md-2'>"+
									"<input placeholder='Birth Date' class='floatlabel' name='date' type='text'>"+
								"</div>"+
								"<div class='col-md-1'>"+
									"<button type='button' class='btn red' onclick=$(this).parent().parent().remove();><i class='fa fa-trash'></i></button>"+
								"</div>"+
							"</div>";
				$(attribute_label).append(content);

				var row_element=$('#form347_popup_'+id);
				var relation_element=$(row_element).find("input[name='relation']")[0];
				set_static_value_list_json('policies','relations',relation_element);

				var date_element=$(row_element).find("input[name='date']")[0];
				$(date_element).datepicker();

				$(form).formcontrol();
			});

			$("#form347_popup_link").click();

			var attributes_data={data_store:'policies',count:1,return_column:'dependents',
								indexes:[{index:'id',exact:policy_id}]};
			read_json_single_column(attributes_data,function(attributes)
			{
				if(attributes.length>0)
				{
					var values_array=vUtil.jsonParse(attributes[0]);
					var content="";
					values_array.forEach(function(fvalue)
					{
						content+="<div class='row'>"+
									"<div class='col-md-5'>"+
										"<input placeholder='Name' readonly='readonly' class='floatlabel' value='"+fvalue.name+"' name='name' type='text'>"+
									"</div>"+
									"<div class='col-md-4'>"+
										"<input placeholder='Relation' readonly='readonly' class='floatlabel' value='"+fvalue.relation+"' name='relation' type='text'>"+
									"</div>"+
									"<div class='col-md-2'>"+
										"<input placeholder='Birth Date' readonly='readonly' class='floatlabel' value='"+vTime.date({time:fvalue.date})+"' name='date' type='text'>"+
									"</div>"+
									"<div class='col-md-1'>"+
										"<button type='button' class='btn red' onclick=$(this).parent().parent().remove();><i class='fa fa-trash'></i></button>"+
									"</div>"+
								"</div>";
					});
					$(attribute_label).html(content);
				}
				setTimeout(function(){$(form).formcontrol();},1000);
			});

			$(form).off("submit");
			$(form).on("submit",function(event)
			{
				event.preventDefault();
				if(is_update_access('form347'))
				{
					var last_updated=get_my_time();
					var returns_column_array=[];

					var attribute_json={data_store:'attributes',
									loader:'no',
									data:[]};
					var id=vUtil.newKey();

					$("#form347_popup_columns>div").each(function()
					{
						var return_obj={name:$(this).find("input[name='name']").val(),
										relation:$(this).find("input[name='relation']").val(),
										date:vTime.unix({date:$(this).find("input[name='date']").val()})};
						returns_column_array.push(return_obj);

						id++;
						var attribute_json_array=[{index:'id',value:id},
			 					{index:'value',value:JSON.stringify(return_obj)},
								{index:'attribute',value:'Dependants'},
								{index:'type',value:'customer'},
								{index:'name',value:customer_name,uniqueWith:['attribute','value']},
			 					{index:'last_updated',value:last_updated}];

						attribute_json.data.push(attribute_json_array);
					});

					var return_columns=JSON.stringify(returns_column_array);
					var search_json={data_store:'policies',
			 				data:[{index:'id',value:policy_id},
			 					{index:'dependents',value:return_columns},
			 					{index:'last_updated',value:last_updated}]};
					update_json(search_json);

					create_batch_json(attribute_json);
				}
				else
				{
					$("#modal2_link").click();
				}
				$(form).find(".close").click();
			});
		}

		function form347_popup_import_action()
		{
			var form=document.getElementById('form347_popup_import_form');

			var import_type=form.elements['type'];
			var agent_filter=form.elements['agent'];
			var template_button=form.elements['download'];
			var dummy_button=form.elements['file_dummy'];
			var import_button=form.elements['save'];

			var import_types_list = ['Apollo Policies Search','Apollo Policies Sold', 'ICICI Policies', 'Max Logged Business','Max Renewal Business', 'Star Policies','New Applications','MIS'];
			set_value_list_json(import_types_list,import_type);

			var agent_data={data_store:'attributes',return_column:'name',
							indexes:[{index:'value',exact:'Agent'},
									{index:'type',exact:'staff'},
									{index:'attribute',exact:'Designation'}]};
			set_my_value_list_json(agent_data,agent_filter);

			//initializing file import button
			var file_object=vUtil.jsonParse($(dummy_button).fileInput());
			var select_file=document.getElementById(file_object.input);
			var selected_file=document.getElementById(file_object.output);

			$(template_button).off("click");
			$(template_button).on("click",function(event)
			{
				form347_import_template(import_type.value);
			});

			$(form).off('submit');
			$(form).on('submit',function(event)
			{
				event.preventDefault();

				vImport.readFile(select_file,function(content)
			    {
					switch(import_type.value){
						case 'Apollo Policies Sold':vImport.importData(content,form,form347_ap_import,form347_ap_import_validate);
												break;
						case 'Apollo Policies Search':vImport.importData(content,form,form347_ar_import,form347_ar_import_validate);
												break;
						case 'Max Logged Business':vImport.importData(content,form,form347_mp_import,form347_mp_import_validate);
												break;
						case 'Max Renewal Business':vImport.importData(content,form,form347_mr_import,form347_mr_import_validate);
												break;
						case 'Star Policies':vImport.importData(content,form,form347_sp_import,form347_sp_import_validate);
												break;
						case 'ICICI Policies':vImport.importData(content,form,form347_ip_import,form347_ip_import_validate);
												break;
						case 'New Applications':vImport.importData(content,form,form347_na_import,form347_na_import_validate);
												break;
						case 'MIS':vImport.importData(content,form,form347_mis_import,form347_mis_import_validate);
												break;
					}
			    });
			});
			$("#form347_popup_import_link").click();
		}

        function form347_import_template(import_type)
        {
			var data_array=[];
			switch(import_type)
			{
            	case 'New Applications': data_array=['application number','policy number','policy name',
												'description','issuer','agent','sum insured','premium','received amount',
												'adults','children','age (oldest member)','policy start date',
												'policy term','policy issue date','policy type','issue type','ported from',
												'renewed from','sales source','team lead','sales manager','tele caller',
												'policy holder name','policy holder phone','policy holder email',
												'policy holder address','policy holder birthdate'];
												break;
				case 'MIS':data_array=['application number','policy number','policy name',
												'description','issuer','agent','sum insured','premium','received amount',
												'adults','children','age (oldest member)','policy start date',
												'policy term','policy issue date','policy type','issue type','ported from',
												'renewed from','sales source','team lead','sales manager','tele caller',
												'policy holder name','policy holder phone','policy holder email',
												'policy holder address','policy holder birthdate'];
												break;
				case 'Apollo Policies Sold':data_array=['Main_Member_Name','Product_Name','Policy_Number',
												'Premium','Sum_Insured','Policy_issue_date','Policy_start_date',
												'Policy_end_date','Address_of_main_member'];
												break;
				case 'Apollo Policies Search':data_array=['Policy_Number','Member_Name','Product_Name',
												'Policy_start_date','Member_ID','Policy_issue_date','Policy_end_date',
												'Premium','Application_Number'];
												break;
				case 'Max Logged Business':data_array=['First Name','Last Name','Full Name','Application Number',
												'Policy Number','Customer Id','Plan Type','Product Id',
												'Product Genre','Insured Lives','Logged Premium',
												'Issued Premium (Without Taxes)','Loading Premium','Sum Assured',
												'Individual Sum Assured','Critical Illness Sum Assured',
												'Personal Accident Sum Assured','Hospital Cash Sum Assured',
												'Login Branch','Sales Branch','Zone','Channel','Sub Channel',
												'Agent Code','Agent Name','Agency Manager Id','Agency Manager Name',
												'Logged Date','Logged Month','Issued Date','Issued Month',
												'Maximus Status','Lead Status','Hums Status','Hums Status Update Date',
												'Current Team','Current Status Ageing','Login Ageing','Designation',
												'Policy Start Date','Policy End Date'];
												break;
				case 'Max Renewal Business': data_array=['First Name','Last Name','Full Name','Policy Number','Previous Policy Number',
												'Policy Expiry Date','Customer Id','Plan Type','Product Genre','Insured Lives',
												'Renewal Premium','Loading Premium','Sum Assured','Individual Sum Assured',
												'Critical Illness Sum Assured','Personal Accident Sum Assured',
												'Hospital Cash Sum Assured','Branch','Zone','Renewal Channel','Sub Channel',
												'Renewal Agent Code','Renewal Agent Name','Agency Manager Id',
												'Agency Manager Name','Renewal Logged Date','Renewal Logged Month',
												'Renewal Issuance Date','Renewal Issuance Month','Maximus Status','Lead Status',
												'Current Team','Current Status Ageing','Login Ageing','Policy Start Date',
												'Designation'];
												break;
				case 'Star Policies':data_array=['S.No','Office Code','Office Name','Product','Policy Number','Premium',
												'Policy From Date','Policy To Date','Policy Issue Date','Intermediatery Type',
												'Intermediatery Code','Intermediatery Name','Fullfiller Code','Fullfiller Name',
												'Fresh/Renewal','Assured Name','Telephone No','ADDRESS','Claims Paid',
												'Previous Policy Number'];
												break;
				case 'ICICI Policies':data_array=['Product Class','Product Sub Class','Policy Business Type',
												'Policy Number (Click to view certificate)','Email','Policy Cover Note No',
												'Customer Full Name','OD premium','Net GWP	Commission %',
												'Policy Endorsement Type','Policy Reporting Type','Policy Start Date',
												'Policy Endorsement Date'];
												break;
			}
            my_array_to_csv(data_array);
        };

		/**
		*	Import validation for apollo policies search report
		*/
		function form347_ar_import_validate(data_array)
        {
            var validate_template_array=[{column:'Policy_Number',required:'yes',regex:new RegExp('^[0-9a-zA-Z_-]+$')},
                                    {column:'Member_Name',required:'yes',regex:new RegExp('^[0-9a-zA-Z _.,()-]+$')},
									{column:'Product_Name',required:'yes',regex:new RegExp('^[0-9a-zA-Z _.,()-]+$')},
									{column:'Policy_start_date',required:'yes',regex:new RegExp('^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{2,4} 12:00:00 AM')},
									{column:'Member_ID',required:'yes',regex:new RegExp('^[0-9]+$')},
									{column:'Policy_issue_date',required:'yes',regex:new RegExp('^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{2,4} 12:00:00 AM')},
									{column:'Policy_end_date',required:'yes',regex:new RegExp('^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{2,4} 12:00:00 AM')},
									{column:'Application_Number',required:'yes',regex:new RegExp('^[0-9a-zA-Z_-]+$')},
									{column:'Premium',required:'yes',regex:new RegExp('^[0-9 .]+$')}];

            var error_array=vImport.validate(data_array,validate_template_array);
            return error_array;
        }

		/**
		*	Import for apollo policies search report
		*/
		function form347_ar_import(policies)
        {
          	var create_policy_json={data_store:'policies',data:[]};
			var update_policy_json={data_store:'policies',log:'yes',data:[],
		 					log_data:{title:'Policies from Apollo',link_to:'form347'}};
			var customer_json={data_store:'customers',loader:'no',data:[]};
			var attribute_json={data_store:'attributes',loader:'no',data:[]};

			var counter=1;
			var last_updated=vTime.unix();
			show_loader();

			for(var a in policies)
			{
				policies[a].id="";
				policies[a].policy_holder="";
				policies[a].description="";
				policies[a].type="";
				policies[a].preferred="";
				policies[a].issue_type='';
				policies[a].old_premium=0;
				policies[a].agent=document.getElementById('form347_popup_import_form').elements['agent'].value;
				policies[a].start_time = vTime.unix({date:policies[a].Policy_start_date,inputFormat:'mm/dd/yyyy hh:mm:ss AM'});
				policies[a].end_time = vTime.unix({date:policies[a].Policy_end_date,inputFormat:'mm/dd/yyyy hh:mm:ss AM'});
				policies[a].issue_time = vTime.unix({date:policies[a].Policy_issue_date,inputFormat:'mm/dd/yyyy hh:mm:ss AM'});
				policies[a].term = ((policies[a].end_time-policies[a].start_time)/(366*86400000)>1) ? 'two years' : 'one year';
				policies[a].issued_in_quarter = vTime.quarter({time:policies[a].issue_time,inputFormat:'unix'});
			}

			form347_policy_bank(policies,'Product_Name','Apollo',function()
			{
				form347_policy_ids(policies,'Policy_Number','Apollo',function()
				{
					// console.log(policies);
					for(var i=0;i<policies.length;i++)
					{
						if(!vUtil.isBlank(policies[i].id))
						{
							var data_json_array=[{index:'id',value:policies[i].id},
				 					{index:'policy_name',value:policies[i].Product_Name},
									{index:'application_num',value:policies[i].Application_Number},
									{index:'member_id',value:policies[i].Member_ID},
									{index:'premium',value:policies[i].Premium},
									{index:'issuer',value:'Apollo'},
									{index:'term',value:policies[i].term},
									{index:'agent',value:policies[i].agent},
									{index:'issued_in_quarter',value:policies[i].issued_in_quarter},
									{index:'start_date',value:policies[i].start_time},
									{index:'end_date',value:policies[i].end_time},
									{index:'issue_date',value:policies[i].issue_time},
									{index:'type',value:policies[i].type},
									{index:'description',value:policies[i].description},
									{index:'preferred',value:policies[i].preferred},
									{index:'status',value:'issued'},
				 					{index:'last_updated',value:last_updated}];

							update_policy_json.data.push(data_json_array);
							policies.splice(i,1);
							i--;
						}
					}

					if(policies.length>0)
					{
						form347_application_ids(policies,'Application_Number','Apollo',function()
						{
							for(var i=0;i<policies.length;i++)
							{
								counter++;
								if(!vUtil.isBlank(policies[i].id))
								{
									var policy_array=[{index:'id',value:policies[i].id},
						 					{index:'policy_name',value:policies[i].Product_Name},
											{index:'policy_num',value:policies[i].Policy_Number},
											{index:'member_id',value:policies[i].Member_ID},
											{index:'premium',value:policies[i].Premium},
											{index:'issuer',value:'Apollo'},
											{index:'term',value:policies[i].term},
											{index:'agent',value:policies[i].agent},
											{index:'issued_in_quarter',value:policies[i].issued_in_quarter},
											{index:'start_date',value:policies[i].start_time},
											{index:'end_date',value:policies[i].end_time},
											{index:'issue_date',value:policies[i].issue_time},
											{index:'status',value:'issued'},
											{index:'type',value:policies[i].type},
											{index:'description',value:policies[i].description},
											{index:'preferred',value:policies[i].preferred},
											{index:'last_updated',value:last_updated}];
									if(!vUtil.isBlank(policies[i].issue_type))
									{
										var issue_type_obj = {index:'issue_type',value:policies[i].issue_type};
										policy_array.push(issue_type_obj);
									}
									var upsell= (policies[i].old_premium!=0 && parseFloat(policies[i].Premium) > parseFloat(policies[i].old_premium)) ? 'yes' :'no';
									var upsell_obj = {index:'upsell',value:upsell};
									policy_array.push(upsell_obj);

									update_policy_json.data.push(policy_array);

									var attributes_array=[{index:'id',value:vUtil.newKey()+counter},
						 					{index:'attribute',value:'Member ID',uniqueWith:['value','name']},
											{index:'type',value:'customer'},
											{index:'value',value:policies[i].Member_ID},
											{index:'name',value:policies[i].policy_holder},
						 					{index:'last_updated',value:last_updated}];

									attribute_json.data.push(attributes_array);

									policies.splice(i,1);
									i--;
								}
							}

							if(policies.length>0)
							{
								for(var i=0; i<policies.length;i++)
								{
									counter++;
									if(vUtil.isBlank(policies[i].policy_holder))
									{
										policies[i].policy_holder=policies[i].Member_Name+" ("+policies[i].Member_ID+")";
									}
									var policy_array=[{index:'id',value:vUtil.newKey()+counter},
						 					{index:'policy_name',value:policies[i].Product_Name},
											{index:'application_num',value:policies[i].Application_Number},
											{index:'policy_num',value:policies[i].Policy_Number,unique:'yes'},
											{index:'policy_holder',value:policies[i].policy_holder},
											{index:'member_id',value:policies[i].Member_ID},
											{index:'premium',value:policies[i].Premium},
											{index:'issuer',value:'Apollo'},
											{index:'agent',value:policies[i].agent},
											{index:'issued_in_quarter',value:policies[i].issued_in_quarter},
											{index:'term',value:policies[i].term},
											{index:'start_date',value:policies[i].start_time},
											{index:'end_date',value:policies[i].end_time},
											{index:'issue_date',value:policies[i].issue_time},
											{index:'status',value:'issued'},
											{index:'type',value:policies[i].type},
											{index:'description',value:policies[i].description},
											{index:'preferred',value:policies[i].preferred},
											{index:'last_updated',value:last_updated}];

									if(vUtil.isBlank(policies[i].issue_type))
									{
										policies[i].issue_type='fresh';
									}
									var issue_type_obj = {index:'issue_type',value:policies[i].issue_type};
									policy_array.push(issue_type_obj);

									var upsell= (policies[i].old_premium!=0 && parseFloat(policies[i].Premium) > parseFloat(policies[i].old_premium)) ? 'yes' :'no';
									var upsell_obj = {index:'upsell',value:upsell};
									policy_array.push(upsell_obj);

									create_policy_json.data.push(policy_array);

									var attributes_array=[{index:'id',value:vUtil.newKey()+counter},
						 					{index:'attribute',value:'Member ID',uniqueWith:['value','name']},
											{index:'type',value:'customer'},
											{index:'value',value:policies[i].Member_ID},
											{index:'name',value:policies[i].policy_holder},
						 					{index:'last_updated',value:last_updated}];

									attribute_json.data.push(attributes_array);

									var customer_json_array=[{index:'id',value:vUtil.newKey()+counter},
											{index:'name',value:policies[i].Member_Name},
											{index:'acc_name',value:policies[i].policy_holder,unique:'yes'},
											{index:'last_updated',value:last_updated}];

									customer_json.data.push(customer_json_array);

								}
							}

							create_batch_json(create_policy_json);
							create_batch_json(customer_json);
							create_batch_json(attribute_json);
							update_batch_json(update_policy_json);
						});
					}
					else{
						update_batch_json(update_policy_json);
					}
				});
			});
        };

		/**
		*	Import validation for apollo policies sold report
		*/
		function form347_ap_import_validate(data_array)
        {
            var validate_template_array=[{column:'Policy_Number',required:'yes',regex:new RegExp('^[0-9a-zA-Z_-]+$')},
                                    {column:'Main_Member_Name',required:'yes',regex:new RegExp('^[0-9a-zA-Z _.,()-]+$')},
									{column:'Product_Name',required:'yes',regex:new RegExp('^[0-9a-zA-Z _.,()-]+$')},
									{column:'Policy_start_date',required:'yes',regex:new RegExp('^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{2,4} 12:00:00 AM')},
									{column:'Address_of_main_member',required:'yes',regex:new RegExp('^[0-9a-zA-Z .,;!/$%^&*()#@\\_-]+$')},
									{column:'Policy_issue_date',required:'yes',regex:new RegExp('^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{2,4} 12:00:00 AM')},
									{column:'Policy_end_date',required:'yes',regex:new RegExp('^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{2,4} 12:00:00 AM')},
									{column:'Premium',required:'yes',regex:new RegExp('^[0-9 .]+$')},
									{column:'Sum_Insured',required:'yes',regex:new RegExp('^[0-9 .]+$')}];

            var error_array=vImport.validate(data_array,validate_template_array);
            return error_array;
        }

		/**
		*	Import validation for apollo policies sold report
		*/
		function form347_ap_import(policies)
        {
          	var update_policy_json={data_store:'policies',log:'yes',data:[],
		 					log_data:{title:'Policies from Apollo',link_to:'form347'}};
			var customer_json={data_store:'customers',loader:'no',data:[]};

			var counter=1;
			var last_updated=vTime.unix();
			show_loader();

			for(var a in policies)
			{
				policies[a].id="";
				policies[a].description="";
				policies[a].type="";
				policies[a].preferred="";
				policies[a].policy_holder="";
				policies[a].policy_holder_id="";
				policies[a].agent=document.getElementById('form347_popup_import_form').elements['agent'].value;
				policies[a].start_time = vTime.unix({date:policies[a].Policy_start_date,inputFormat:'mm/dd/yyyy hh:mm:ss AM'});
				policies[a].end_time = vTime.unix({date:policies[a].Policy_end_date,inputFormat:'mm/dd/yyyy hh:mm:ss AM'});
				policies[a].issue_time = vTime.unix({date:policies[a].Policy_issue_date,inputFormat:'mm/dd/yyyy hh:mm:ss AM'});
				policies[a].term = ((policies[a].end_time-policies[a].start_time)/(366*86400000)>1) ? 'two years' : 'one year';
				policies[a].issued_in_quarter = vTime.quarter({time:policies[a].issue_time,inputFormat:'unix'});
				policies[a].agent=document.getElementById('form347_popup_import_form').elements['agent'].value;
			}

			form347_policy_bank(policies,'Product_Name','Apollo',function()
			{
				form347_policy_ids(policies,'Policy_Number','Apollo',function()
				{
					// console.log(policies);
					for(var i=0;i<policies.length;i++)
					{
						if(!vUtil.isBlank(policies[i].id))
						{
							var data_json_array=[{index:'id',value:policies[i].id},
				 					{index:'policy_name',value:policies[i].Product_Name},
									{index:'premium',value:policies[i].Premium},
									{index:'sum_insured',value:policies[i].Sum_Insured},
									{index:'issuer',value:'Apollo'},
									{index:'term',value:policies[i].term},
									{index:'agent',value:policies[i].agent},
									{index:'issued_in_quarter',value:policies[i].issued_in_quarter},
									{index:'start_date',value:policies[i].start_time},
									{index:'end_date',value:policies[i].end_time},
									{index:'issue_date',value:policies[i].issue_time},
									{index:'type',value:policies[i].type},
									{index:'description',value:policies[i].description},
									{index:'preferred',value:policies[i].preferred},
									{index:'status',value:'issued'},
				 					{index:'last_updated',value:last_updated}];

							update_policy_json.data.push(data_json_array);
						}
					}

					form347_policy_holder_ids(policies,'policy_holder',function()
					{
						policies.forEach(function(policy)
						{
							var data_json_array=[{index:'id',value:policy.policy_holder_id},
				 					{index:'address',value:policy.Address_of_main_member},
									{index:'name',value:policy.Main_Member_Name},
									{index:'last_updated',value:last_updated}];

							customer_json.data.push(data_json_array);
						});

						update_batch_json(update_policy_json);
						update_batch_json(customer_json);

					});
				});
			});
        };


		/**
		*	Import validation for ICICI policies
		*/
		function form347_ip_import_validate(data_array)
        {
            var validate_template_array=[{column:'Product Class',required:'yes',regex:new RegExp('^[0-9a-zA-Z _-]+$')},
									{column:'Product Sub Class',required:'yes',regex:new RegExp('^[0-9a-zA-Z_ -]+$')},
                                    {column:'Policy Business Type',required:'yes',list:['NEW BUSINESS','ROLL OVER','RENEWAL BUSINESS']},
									{column:'Policy Number (Click to view certificate)',required:'yes',regex:new RegExp('^[0-9a-zA-Z \/-]+$')},
									{column:'Policy Endorsement Type',required:'yes',list:['ISSUED','RENEWED','ENDORSED','CANCELLED']},
									{column:'Customer Full Name',required:'yes',regex:new RegExp('^[0-9a-zA-Z .-]+$')},
									{column:'Policy Endorsement Date',required:'yes',regex:new RegExp('^[0-9]{1,2}\-[a-zA-Z]{3}\-[0-9]{4}')},
									{column:'Policy Start Date',required:'yes',regex:new RegExp('^[0-9]{1,2}\-[a-zA-Z]{3}\-[0-9]{4}')},
									{column:'Policy Cover Note No',required:'yes',regex:new RegExp('^[0-9a-zA-Z_-]+$')},
									{column:'Net GWP',required:'yes',regex:new RegExp('^[0-9 .-]+$')},
									{column:'Commission %',required:'yes',regex:new RegExp('^[0-9 .-]+$')}];

            var error_array=vImport.validate(data_array,validate_template_array);
            return error_array;
        }

		/**
		*	Import for ICICI policies search report
		*/
		function form347_ip_import(policies)
        {
          	var create_policy_json={data_store:'policies',data:[]};
			var update_policy_json={data_store:'policies',log:'yes',data:[],
		 					log_data:{title:'Policies from ICICI',link_to:'form347'}};
			var customer_json={data_store:'customers',loader:'no',data:[]};

			var counter=1;
			var last_updated=vTime.unix();
			show_loader();

			for(var a in policies)
			{
				policies[a].id="";
				policies[a].policy_holder="";
				policies[a].description="";
				policies[a].type="";
				policies[a].preferred="";
				policies[a].issue_type='';
				policies[a].old_premium=0;
				policies[a].Policy_Number = policies[a]['Policy Number (Click to view certificate)'].trim();
				policies[a].start_time = vTime.unix({date:policies[a]['Policy Start Date'],inputFormat:'dd-mmm-yyyy'});
				policies[a].end_time = policies[a].start_time+(365*86400000);
				policies[a].issue_time = vTime.unix({date:policies[a]['Policy Endorsement Date'],inputFormat:'dd-mmm-yyyy'});
				policies[a].term = 'one year';
				policies[a].application_num = '';
				policies[a].issued_in_quarter = vTime.quarter({time:policies[a].issue_time,inputFormat:'unix'});
				policies[a].agent=document.getElementById('form347_popup_import_form').elements['agent'].value;
			}
			// console.log(policies);
			form347_policy_bank(policies,'Product Sub Class','ICICI',function()
			{
				form347_policy_ids(policies,'Policy_Number','ICICI',function()
				{
					// console.log(policies);
					for(var i=0;i<policies.length;i++)
					{
						if(!vUtil.isBlank(policies[i].id))
						{
							var data_json_array=[{index:'id',value:policies[i].id},
				 					{index:'policy_name',value:policies[i]['Product Sub Class']},
									{index:'cover_note',value:policies[i]['Policy Cover Note No']},
									{index:'premium',value:policies[i]['Net GWP']},
									{index:'issuer',value:'ICICI'},
									{index:'term',value:policies[i].term},
									{index:'agent',value:policies[i].agent},
									{index:'issued_in_quarter',value:policies[i].issued_in_quarter},
									{index:'start_date',value:policies[i].start_time},
									{index:'end_date',value:policies[i].end_time},
									{index:'issue_date',value:policies[i].issue_time},
									{index:'type',value:policies[i].type},
									{index:'description',value:policies[i].description},
									{index:'preferred',value:policies[i].preferred},
									{index:'status',value:'issued'},
				 					{index:'last_updated',value:last_updated}];

							update_policy_json.data.push(data_json_array);
							policies.splice(i,1);
							i--;
						}
					}

					if(policies.length>0)
					{
						form347_policy_ids_by_name(policies,'Customer Full Name','Product Sub Class','ICICI',function()
						{
							// console.log(policies);
							for(var i=0;i<policies.length;i++)
							{
								counter++;
								if(!vUtil.isBlank(policies[i].id))
								{
									var policy_array=[{index:'id',value:policies[i].id},
											{index:'policy_num',value:policies[i].Policy_Number},
											{index:'policy_name',value:policies[i]['Product Sub Class']},
											{index:'cover_note',value:policies[i]['Policy Cover Note No']},
											{index:'premium',value:policies[i]['Net GWP']},
											{index:'issuer',value:'ICICI'},
											{index:'term',value:policies[i].term},
											{index:'agent',value:policies[i].agent},
											{index:'issued_in_quarter',value:policies[i].issued_in_quarter},
											{index:'start_date',value:policies[i].start_time},
											{index:'end_date',value:policies[i].end_time},
											{index:'issue_date',value:policies[i].issue_time},
											{index:'type',value:policies[i].type},
											{index:'description',value:policies[i].description},
											{index:'preferred',value:policies[i].preferred},
											{index:'status',value:'issued'},
											{index:'last_updated',value:last_updated}];

									var issue_type= (policies[i]['Policy Endorsement Type'] == "RENEWED") ? 'renewal' :'fresh';
									var issue_type_obj = {index:'issue_type',value:issue_type};
									policy_array.push(issue_type_obj);

									var upsell= (policies[i].old_premium!=0 && parseFloat(policies[i]['Net GWP']) > parseFloat(policies[i].old_premium)) ? 'yes' :'no';
									var upsell_obj = {index:'upsell',value:upsell};
									policy_array.push(upsell_obj);

									update_policy_json.data.push(policy_array);

									policies.splice(i,1);
									i--;
								}
							}

							if(policies.length>0)
							{
								form347_renewed_policy_ids_by_name(policies,'Customer Full Name','ICICI',function()
								{
									var newKey=vUtil.newKey();
									for(var i=0; i<policies.length;i++)
									{
										newKey++;
										if(vUtil.isBlank(policies[i].policy_holder))
										{
											policies[i].policy_holder=policies[i]['Customer Full Name']+" ("+policies[i]['Policy Cover Note No']+")";
										}
										var policy_array=[{index:'id',value:newKey},
												{index:'policy_num',value:policies[i].Policy_Number},
												{index:'policy_holder',value:policies[i].policy_holder},
												{index:'policy_name',value:policies[i]['Product Sub Class']},
												{index:'application_num',value:policies[i].application_num},
												{index:'cover_note',value:policies[i]['Policy Cover Note No']},
												{index:'premium',value:policies[i]['Net GWP']},
												{index:'issuer',value:'ICICI'},
												{index:'term',value:policies[i].term},
												{index:'agent',value:policies[i].agent},
												{index:'issued_in_quarter',value:policies[i].issued_in_quarter},
												{index:'start_date',value:policies[i].start_time},
												{index:'end_date',value:policies[i].end_time},
												{index:'issue_date',value:policies[i].issue_time},
												{index:'type',value:policies[i].type},
												{index:'description',value:policies[i].description},
												{index:'preferred',value:policies[i].preferred},
												{index:'status',value:'issued'},
												{index:'last_updated',value:last_updated}];

										var issue_type= (policies[i]['Policy Endorsement Type'] == "RENEWED") ? 'renewal' :'fresh';
										var issue_type_obj = {index:'issue_type',value:issue_type};
										policy_array.push(issue_type_obj);

										var upsell= (policies[i].old_premium!=0 && parseFloat(policies[i]['Net GWP']) > parseFloat(policies[i].old_premium)) ? 'yes' :'no';
										var upsell_obj = {index:'upsell',value:upsell};
										policy_array.push(upsell_obj);

										create_policy_json.data.push(policy_array);

										var customer_json_array=[{index:'id',value:newKey},
												{index:'name',value:policies[i]['Customer Full Name']},
												{index:'acc_name',value:policies[i].policy_holder,unique:'yes'},
												{index:'last_updated',value:last_updated}];

										customer_json.data.push(customer_json_array);
									}

									create_batch_json(create_policy_json);
									create_batch_json(customer_json);
								});
							}
							else{
								update_batch_json(update_policy_json);
							}
							// console.log(create_policy_json);
						});
					}
					else{
						update_batch_json(update_policy_json);
					}
				});
			});
        };

		/**
		*	Import validation for max logged business report
		*/
		function form347_mp_import_validate(data_array)
		{
			var validate_template_array=[{column:'Full Name',required:'yes',regex:new RegExp('^[0-9a-zA-Z _.,()-]+$')},
									{column:'Application Number',required:'yes',regex:new RegExp('^[0-9a-zA-Z _.,()-]+$')},
									{column:'Policy Number',regex:new RegExp('^[0-9a-zA-Z _.,()-]+$')},
									{column:'Customer Id',regex:new RegExp('^[0-9a-zA-Z _.,()-]+$')},
									{column:'Plan Type',regex:new RegExp('^[0-9a-zA-Z _.,()-]+$')},
									{column:'Product Id',regex:new RegExp('^[0-9a-zA-Z _.,()-]+$')},
									{column:'Product Genre',regex:new RegExp('^[0-9a-zA-Z _.,()-]+$')},
									{column:'Insured Lives',regex:new RegExp('^[0-9 .-]+$')},
									{column:'Logged Premium',regex:new RegExp('^[0-9 .-]+$')},
									{column:'Issued Premium (Without Taxes)',regex:new RegExp('^[0-9 .-]+$')},
									{column:'Sum Assured',regex:new RegExp('^[0-9 .-]+$')},
									{column:'Individual Sum Assured',regex:new RegExp('^[0-9 .-]+$')},
									{column:'Issued Date',regex:new RegExp('^[0-9]{2}\-[a-zA-Z]{3}\-[0-9]{4}')},
									{column:'Policy Start Date',regex:new RegExp('^[0-9]{2}\-[a-zA-Z]{3}\-[0-9]{4}')},
									{column:'Policy End Date',regex:new RegExp('^[0-9]{2}\-[a-zA-Z]{3}\-[0-9]{4}')}];

			var error_array=vImport.validate(data_array,validate_template_array);
			return error_array;
		}

		/**
		*	Import for max logged business report
		*/
		function form347_mp_import(policies)
		{
			var create_policy_json={data_store:'policies',data:[]};
			var update_policy_json={data_store:'policies',log:'yes',data:[],
							log_data:{title:'Policies from Max',link_to:'form347'}};
			var customer_json={data_store:'customers',loader:'no',data:[]};
			var attribute_json={data_store:'attributes',loader:'no',data:[]};

			var counter=1;
			var last_updated=vTime.unix();
			show_loader();

			for(var a=0;a<policies.length;a++)
			{
				if(vUtil.isBlank(policies[a]['Policy Number']))
				{
					policies.splice(a,1);
					a--;
					continue;
				}

				policies[a].id="";
				policies[a].policy_holder="";
				policies[a].description="";
				policies[a].type="";
				policies[a].preferred="";
				policies[a].issuer='Max';
				policies[a].issue_type='';
				policies[a].old_premium=0;
				policies[a].sum_insured=parseFloat(policies[a]['Insured Lives'])*parseFloat(policies[a]['Individual Sum Assured']);
				policies[a].policy_name=policies[a]['Product Genre']+" - "+policies[a]['Plan Type'];
				policies[a].start_time = vTime.unix({date:policies[a]['Policy Start Date'],inputFormat:'dd-mmm-yyyy'});
				policies[a].end_time = vTime.unix({date:policies[a]['Policy End Date'],inputFormat:'dd-mmm-yyyy'});
				policies[a].issue_time = vTime.unix({date:policies[a]['Issued Date'],inputFormat:'dd-mmm-yyyy'});
				policies[a].term = ((policies[a].end_time-policies[a].start_time)/(366*86400000)>1) ? 'two years' : 'one year';
				policies[a].issued_in_quarter = vTime.quarter({time:policies[a].issue_time,inputFormat:'unix'});
				policies[a].agent=document.getElementById('form347_popup_import_form').elements['agent'].value;
			}

			form347_policy_bank(policies,'policy_name','Max',function()
			{
				form347_policy_ids(policies,'Policy Number','Max',function()
				{
					for(var i=0;i<policies.length;i++)
					{
						if(!vUtil.isBlank(policies[i].id))
						{
							var data_json_array=[{index:'id',value:policies[i].id},
									{index:'policy_name',value:policies[i].policy_name},
									{index:'application_num',value:policies[i]['Application Number']},
									{index:'member_id',value:policies[i]['Customer Id']},
									{index:'premium',value:policies[i]['Issued Premium (Without Taxes)']},
									{index:'sum_insured',value:policies[i].sum_insured},
									{index:'issuer',value:policies[i].issuer},
									{index:'term',value:policies[i].term},
									{index:'agent',value:policies[i].agent},
									{index:'issued_in_quarter',value:policies[i].issued_in_quarter},
									{index:'start_date',value:policies[i].start_time},
									{index:'end_date',value:policies[i].end_time},
									{index:'issue_date',value:policies[i].issue_time},
									{index:'type',value:policies[i].type},
									{index:'description',value:policies[i].description},
									{index:'preferred',value:policies[i].preferred},
									{index:'status',value:'issued'},
									{index:'last_updated',value:last_updated}];

							update_policy_json.data.push(data_json_array);
							policies.splice(i,1);
							i--;
						}
					}

					if(policies.length>0)
					{
						form347_application_ids(policies,'Application Number','Max',function()
						{
							for(var i=0;i<policies.length;i++)
							{
								counter++;
								if(!vUtil.isBlank(policies[i].id))
								{
									var data_json_array=[{index:'id',value:policies[i].id},
											{index:'policy_name',value:policies[i].policy_name},
											{index:'application_num',value:policies[i]['Application Number']},
											{index:'member_id',value:policies[i]['Customer Id']},
											{index:'premium',value:policies[i]['Issued Premium (Without Taxes)']},
											{index:'sum_insured',value:policies[i].sum_insured},
											{index:'issuer',value:policies[i].issuer},
											{index:'term',value:policies[i].term},
											{index:'agent',value:policies[i].agent},
											{index:'issued_in_quarter',value:policies[i].issued_in_quarter},
											{index:'start_date',value:policies[i].start_time},
											{index:'end_date',value:policies[i].end_time},
											{index:'issue_date',value:policies[i].issue_time},
											{index:'type',value:policies[i].type},
											{index:'description',value:policies[i].description},
											{index:'preferred',value:policies[i].preferred},
											{index:'status',value:'issued'},
											{index:'issue_type',value:'fresh'},
											{index:'upsell',value:'no'},
											{index:'last_updated',value:last_updated}];

									update_policy_json.data.push(data_json_array);

									var attributes_array=[{index:'id',value:vUtil.newKey()+counter},
											{index:'attribute',value:'Customer ID',uniqueWith:['value','name']},
											{index:'type',value:'customer'},
											{index:'value',value:policies[i]['Customer Id']},
											{index:'name',value:policies[i].policy_holder},
											{index:'last_updated',value:last_updated}];

									attribute_json.data.push(attributes_array);

									policies.splice(i,1);
									i--;
								}
							}

							if(policies.length>0)
							{
								for(var i=0; i<policies.length;i++)
								{
									counter++;
									if(vUtil.isBlank(policies[i].policy_holder))
									{
										policies[i].policy_holder=policies[i]['Full Name']+" ("+policies[i]['Customer Id']+")";
									}

									var data_json_array=[{index:'id',value:policies[i].id},
											{index:'policy_name',value:policies[i].policy_name},
											{index:'application_num',value:policies[i]['Application Number']},
											{index:'policy_num',value:policies[i]['Policy Number']},
											{index:'member_id',value:policies[i]['Customer Id']},
											{index:'premium',value:policies[i]['Issued Premium (Without Taxes)']},
											{index:'sum_insured',value:policies[i].sum_insured},
											{index:'issuer',value:policies[i].issuer},
											{index:'term',value:policies[i].term},
											{index:'agent',value:policies[i].agent},
											{index:'issued_in_quarter',value:policies[i].issued_in_quarter},
											{index:'start_date',value:policies[i].start_time},
											{index:'end_date',value:policies[i].end_time},
											{index:'issue_date',value:policies[i].issue_time},
											{index:'type',value:policies[i].type},
											{index:'description',value:policies[i].description},
											{index:'preferred',value:policies[i].preferred},
											{index:'policy_holder',value:policies[i].policy_holder},
											{index:'status',value:'issued'},
											{index:'issue_type',value:'fresh'},
											{index:'upsell',value:'no'},
											{index:'last_updated',value:last_updated}];

									create_policy_json.data.push(data_json_array);

									var attributes_array=[{index:'id',value:vUtil.newKey()+counter},
											{index:'attribute',value:'Customer ID',uniqueWith:['value','name']},
											{index:'type',value:'customer'},
											{index:'value',value:policies[i]['Customer Id']},
											{index:'name',value:policies[i].policy_holder},
											{index:'last_updated',value:last_updated}];

									attribute_json.data.push(attributes_array);

									var customer_json_array=[{index:'id',value:vUtil.newKey()+counter},
											{index:'name',value:policies[i]['Full Name']},
											{index:'acc_name',value:policies[i].policy_holder,unique:'yes'},
											{index:'last_updated',value:last_updated}];

									customer_json.data.push(customer_json_array);

								}
							}

							create_batch_json(create_policy_json);
							create_batch_json(customer_json);
							create_batch_json(attribute_json);
							update_batch_json(update_policy_json);
						});
					}
					else{
						update_batch_json(update_policy_json);
					}
				});
			});
		};

		/**
		*	Import validation for max renewal business report
		*/
		function form347_mr_import_validate(data_array)
		{
			var validate_template_array=[{column:'Full Name',required:'yes',regex:new RegExp('^[0-9a-zA-Z _.,()-]+$')},
									{column:'Previous Policy Number',required:'yes',regex:new RegExp('^[0-9a-zA-Z _.,()-]+$')},
									{column:'Policy Number',regex:new RegExp('^[0-9a-zA-Z _.,()-]+$')},
									{column:'Customer Id',regex:new RegExp('^[0-9a-zA-Z _.,()-]+$')},
									{column:'Plan Type',regex:new RegExp('^[0-9a-zA-Z _.,()-]+$')},
									{column:'Product Id',regex:new RegExp('^[0-9a-zA-Z _.,()-]+$')},
									{column:'Product Genre',regex:new RegExp('^[0-9a-zA-Z _.,()-]+$')},
									{column:'Insured Lives',regex:new RegExp('^[0-9 .-]+$')},
									{column:'Renewal Premium',regex:new RegExp('^[0-9 .-]+$')},
									{column:'Sum Assured',regex:new RegExp('^[0-9 .-]+$')},
									{column:'Individual Sum Assured',regex:new RegExp('^[0-9 .-]+$')},
									{column:'Renewal Issuance Date',regex:new RegExp('^[0-9]{2}\-[a-zA-Z]{3}\-[0-9]{4}')},
									{column:'Policy Start Date',regex:new RegExp('^[0-9]{2}\-[a-zA-Z]{3}\-[0-9]{4}')},
									{column:'Policy Expiry Date',regex:new RegExp('^[0-9]{2}\-[a-zA-Z]{3}\-[0-9]{4}')}];

			var error_array=vImport.validate(data_array,validate_template_array);
			return error_array;
		}

		/**
		*	Import for max renewal business report
		*/
		function form347_mr_import(policies)
		{
			var create_policy_json={data_store:'policies',data:[]};
			var update_policy_json={data_store:'policies',log:'yes',data:[],
							log_data:{title:'Renewed Policies from Max',link_to:'form347'}};
			var customer_json={data_store:'customers',loader:'no',data:[]};
			var attribute_json={data_store:'attributes',loader:'no',data:[]};

			var counter=1;
			var last_updated=vTime.unix();
			show_loader();

			for(var a=0;a<policies.length;a++)
			{
				if(vUtil.isBlank(policies[a]['Policy Number']))
				{
					policies.splice(a,1);
					a--;
					continue;
				}

				policies[a].id="";
				policies[a].policy_holder="";
				policies[a].description="";
				policies[a].type="";
				policies[a].preferred="";
				policies[a].issuer='Max';
				policies[a].issue_type='';
				policies[a].old_premium=0;
				policies[a].sum_insured=parseFloat(policies[a]['Insured Lives'])*parseFloat(policies[a]['Individual Sum Assured']);
				policies[a].policy_name=policies[a]['Product Genre']+" - "+policies[a]['Plan Type'];
				policies[a].start_time = vTime.unix({date:policies[a]['Policy Start Date'],inputFormat:'dd-mmm-yyyy'});
				policies[a].end_time = vTime.unix({date:policies[a]['Policy Expiry Date'],inputFormat:'dd-mmm-yyyy'});
				policies[a].issue_time = vTime.unix({date:policies[a]['Renewal Issuance Date'],inputFormat:'dd-mmm-yyyy'});
				policies[a].term = ((policies[a].end_time-policies[a].start_time)/(366*86400000)>1) ? 'two years' : 'one year';
				policies[a].issued_in_quarter = vTime.quarter({time:policies[a].issue_time,inputFormat:'unix'});
				policies[a].agent=document.getElementById('form347_popup_import_form').elements['agent'].value;
			}

			form347_policy_bank(policies,'policy_name','Max',function()
			{
				form347_policy_ids(policies,'Policy Number','Max',function()
				{
					for(var i=0;i<policies.length;i++)
					{
						if(!vUtil.isBlank(policies[i].id))
						{
							var data_json_array=[{index:'id',value:policies[i].id},
									{index:'policy_name',value:policies[i].policy_name},
									{index:'application_num',value:policies[i]['Previous Policy Number']},
									{index:'member_id',value:policies[i]['Customer Id']},
									{index:'premium',value:policies[i]['Renewal Premium']},
									{index:'sum_insured',value:policies[i].sum_insured},
									{index:'issuer',value:policies[i].issuer},
									{index:'term',value:policies[i].term},
									{index:'agent',value:policies[i].agent},
									{index:'issued_in_quarter',value:policies[i].issued_in_quarter},
									{index:'start_date',value:policies[i].start_time},
									{index:'end_date',value:policies[i].end_time},
									{index:'issue_date',value:policies[i].issue_time},
									{index:'type',value:policies[i].type},
									{index:'description',value:policies[i].description},
									{index:'preferred',value:policies[i].preferred},
									{index:'status',value:'issued'},
									{index:'last_updated',value:last_updated}];

							update_policy_json.data.push(data_json_array);
							policies.splice(i,1);
							i--;
						}
					}

					if(policies.length>0)
					{
						form347_application_ids(policies,'Previous Policy Number','Max',function()
						{
							var newKey=vUtil.newKey();
							for(var i=0; i<policies.length;i++)
							{
								newKey++;
								if(vUtil.isBlank(policies[i].policy_holder))
								{
									policies[i].policy_holder=policies[i]['Full Name']+" ("+policies[i]['Customer Id']+")";
								}

								var data_json_array=[{index:'id',value:newKey},
										{index:'policy_name',value:policies[i].policy_name},
										{index:'application_num',value:policies[i]['Previous Policy Number']},
										{index:'policy_num',value:policies[i]['Policy Number']},
										{index:'member_id',value:policies[i]['Customer Id']},
										{index:'premium',value:policies[i]['Renewal Premium']},
										{index:'sum_insured',value:policies[i].sum_insured},
										{index:'issuer',value:policies[i].issuer},
										{index:'term',value:policies[i].term},
										{index:'agent',value:policies[i].agent},
										{index:'issued_in_quarter',value:policies[i].issued_in_quarter},
										{index:'start_date',value:policies[i].start_time},
										{index:'end_date',value:policies[i].end_time},
										{index:'issue_date',value:policies[i].issue_time},
										{index:'type',value:policies[i].type},
										{index:'description',value:policies[i].description},
										{index:'preferred',value:policies[i].preferred},
										{index:'policy_holder',value:policies[i].policy_holder},
										{index:'status',value:'issued'},
										{index:'issue_type',value:'renewal'},
										{index:'last_updated',value:last_updated}];

								var upsell= (policies[i].old_premium!=0 && parseFloat(policies[i]['Renewal Premium']) > parseFloat(policies[i].old_premium)) ? 'yes' :'no';
								var upsell_obj = {index:'upsell',value:upsell};
								data_json_array.push(upsell_obj);

								create_policy_json.data.push(data_json_array);

								var attributes_array=[{index:'id',value:newKey},
										{index:'attribute',value:'Customer ID',uniqueWith:['value','name']},
										{index:'type',value:'customer'},
										{index:'value',value:policies[i]['Customer Id']},
										{index:'name',value:policies[i].policy_holder},
										{index:'last_updated',value:last_updated}];

								attribute_json.data.push(attributes_array);

								var customer_json_array=[{index:'id',value:newKey},
										{index:'name',value:policies[i]['Full Name']},
										{index:'acc_name',value:policies[i].policy_holder,unique:'yes'},
										{index:'last_updated',value:last_updated}];

								customer_json.data.push(customer_json_array);
							}
							create_batch_json(create_policy_json);
							create_batch_json(attribute_json);
							create_batch_json(customer_json);
						});
					}
					else
					{
						update_batch_json(update_policy_json);
					}
				});
			});
		};

		/**
		*	Import validation for Star business report
		*/
		function form347_sp_import_validate(data_array)
		{
			var validate_template_array=[{column:'Assured Name',required:'yes',regex:new RegExp('^[0-9a-zA-Z _.,()-]+$')},
									{column:'Previous Policy Number',regex:new RegExp('^[0-9a-zA-Z\/-]+$')},
									{column:'Policy Number',regex:new RegExp('^[0-9a-zA-Z\/-]+$')},
									{column:'Fresh/Renewal',regex:new RegExp('^[0-9a-zA-Z _.,()-]+$')},
									{column:'Product',regex:new RegExp('^[0-9a-zA-Z _.,()-]+$')},
									{column:'Telephone No',regex:new RegExp('^[0-9a-zA-Z \/-]+$')},
									{column:'ADDRESS',regex:new RegExp('^[0-9a-zA-Z _.,;#@!$%&^*|:<>()\/-]+$')},
									{column:'Premium',regex:new RegExp('^[0-9 .-]+$')},
									{column:'Policy Issue Date',regex:new RegExp('^[0-9]{2}\/[0-9]{2}\/[0-9]{4}')},
									{column:'Policy From Date',regex:new RegExp('^[0-9]{2}\/[0-9]{2}\/[0-9]{4}')},
									{column:'Policy To Date',regex:new RegExp('^[0-9]{2}\/[0-9]{2}\/[0-9]{4}')}];

			var error_array=vImport.validate(data_array,validate_template_array);
			return error_array;
		}

		/**
		*	Import for Star business report
		*/
		function form347_sp_import(policies)
		{
			var create_policy_json={data_store:'policies',data:[]};
			var update_policy_json={data_store:'policies',log:'yes',data:[],
							log_data:{title:'Renewed Policies from Max',link_to:'form347'}};
			var customer_json={data_store:'customers',loader:'no',data:[]};
			var attribute_json={data_store:'attributes',loader:'no',data:[]};

			var counter=1;
			var last_updated=vTime.unix();
			show_loader();

			for(var a=0;a<policies.length;a++)
			{
				if(vUtil.isBlank(policies[a]['Policy Number']))
				{
					policies.splice(a,1);
					a--;
					continue;
				}

				policies[a].id="";
				policies[a].policy_holder="";
				policies[a].description="";
				policies[a].type="";
				policies[a].preferred="";
				policies[a].issuer='Star';
				policies[a].issue_type='';
				policies[a].old_premium=0;
				policies[a].policy_name=policies[a]['Product'];
				policies[a].start_time = vTime.unix({date:policies[a]['Policy From Date']});
				policies[a].end_time = vTime.unix({date:policies[a]['Policy To Date']});
				policies[a].issue_time = vTime.unix({date:policies[a]['Policy Issue Date']});
				policies[a].term = ((policies[a].end_time-policies[a].start_time)/(366*86400000)>1) ? 'two years' : 'one year';
				policies[a].issued_in_quarter = vTime.quarter({time:policies[a].issue_time,inputFormat:'unix'});
				policies[a].agent=document.getElementById('form347_popup_import_form').elements['agent'].value;
			}

			form347_policy_bank(policies,'policy_name','Star',function()
			{
				form347_policy_ids(policies,'Policy Number','Star',function()
				{
					for(var i=0;i<policies.length;i++)
					{
						if(!vUtil.isBlank(policies[i].id))
						{
							var data_json_array=[{index:'id',value:policies[i].id},
									{index:'policy_name',value:policies[i].policy_name},
									{index:'application_num',value:policies[i]['Previous Policy Number']},
									{index:'premium',value:policies[i]['Premium']},
									{index:'issuer',value:policies[i].issuer},
									{index:'term',value:policies[i].term},
									{index:'agent',value:policies[i].agent},
									{index:'issued_in_quarter',value:policies[i].issued_in_quarter},
									{index:'start_date',value:policies[i].start_time},
									{index:'end_date',value:policies[i].end_time},
									{index:'issue_date',value:policies[i].issue_time},
									{index:'type',value:policies[i].type},
									{index:'description',value:policies[i].description},
									{index:'preferred',value:policies[i].preferred},
									{index:'status',value:'issued'},
									{index:'last_updated',value:last_updated}];

							update_policy_json.data.push(data_json_array);
							policies.splice(i,1);
							i--;
						}
					}

					if(policies.length>0)
					{
						form347_policy_ids_by_name_phone(policies,'Star',function()
						{
							for(var i=0;i<policies.length;i++)
							{
								counter++;
								if(!vUtil.isBlank(policies[i].id))
								{
									var policy_array=[{index:'id',value:policies[i].id},
											{index:'policy_num',value:policies[i]['Policy Number']},
											{index:'policy_name',value:policies[i].policy_name},
											{index:'premium',value:policies[i]['Net GWP']},
											{index:'issuer',value:policies[i].issuer},
											{index:'term',value:policies[i].term},
											{index:'agent',value:policies[i].agent},
											{index:'issued_in_quarter',value:policies[i].issued_in_quarter},
											{index:'start_date',value:policies[i].start_time},
											{index:'end_date',value:policies[i].end_time},
											{index:'issue_date',value:policies[i].issue_time},
											{index:'type',value:policies[i].type},
											{index:'description',value:policies[i].description},
											{index:'preferred',value:policies[i].preferred},
											{index:'status',value:'issued'},
											{index:'last_updated',value:last_updated}];

									var issue_type= (policies[i]['Fresh/Renewal'] == "RENEWAL") ? 'renewal' :'fresh';
									var issue_type_obj = {index:'issue_type',value:issue_type};
									policy_array.push(issue_type_obj);

									var upsell= (policies[i].old_premium!=0 && parseFloat(policies[i]['Premium']) > parseFloat(policies[i].old_premium)) ? 'yes' :'no';
									var upsell_obj = {index:'upsell',value:upsell};
									policy_array.push(upsell_obj);

									update_policy_json.data.push(policy_array);

									policies.splice(i,1);
									i--;
								}
							}

							if(policies.length>0)
							{
								form347_renewal_policy_details_name_phone(policies,'Star',function()
								{
									var newKey=vUtil.newKey();
									for(var i=0; i<policies.length;i++)
									{
										newKey++;
										if(vUtil.isBlank(policies[i].policy_holder))
										{
											policies[i].policy_holder=policies[i]['Assured Name']+" ("+policies[i]['Telephone No']+")";
										}
										var policy_array=[{index:'id',value:newKey},
												{index:'policy_num',value:policies[i]['Policy Number']},
												{index:'policy_name',value:policies[i].policy_name},
												{index:'policy_holder',value:policies[i].policy_holder},
												{index:'application_num',value:policies[i]['Previous Policy Number']},
												{index:'premium',value:policies[i]['Premium']},
												{index:'issuer',value:policies[i].issuer},
												{index:'term',value:policies[i].term},
												{index:'agent',value:policies[i].agent},
												{index:'issued_in_quarter',value:policies[i].issued_in_quarter},
												{index:'start_date',value:policies[i].start_time},
												{index:'end_date',value:policies[i].end_time},
												{index:'issue_date',value:policies[i].issue_time},
												{index:'type',value:policies[i].type},
												{index:'description',value:policies[i].description},
												{index:'preferred',value:policies[i].preferred},
												{index:'status',value:'issued'},
												{index:'last_updated',value:last_updated}];

										var issue_type= (policies[i]['Fresh/Renewal'] == "RENEWAL") ? 'renewal' :'fresh';
										var issue_type_obj = {index:'issue_type',value:issue_type};
										policy_array.push(issue_type_obj);

										var upsell= (policies[i].old_premium!=0 && parseFloat(policies[i]['Premium']) > parseFloat(policies[i].old_premium)) ? 'yes' :'no';
										var upsell_obj = {index:'upsell',value:upsell};
										policy_array.push(upsell_obj);

										create_policy_json.data.push(policy_array);

										var customer_json_array=[{index:'id',value:newKey},
												{index:'name',value:policies[i]['Assured Name']},
												{index:'phone',value:policies[i]['Telephone No']},
												{index:'address',value:policies[i]['ADDRESS']},
												{index:'acc_name',value:policies[i].policy_holder,unique:'yes'},
												{index:'last_updated',value:last_updated}];

										customer_json.data.push(customer_json_array);
									}
									create_batch_json(create_policy_json);
									create_batch_json(customer_json);
								});
							}
							else{
								update_batch_json(update_policy_json);
							}
						});
					}
					else{
						update_batch_json(update_policy_json);
					}
				});
			});
		};

    </script>
</div>
