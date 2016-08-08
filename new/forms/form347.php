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
			<fieldset>
				<label style='float:right;'><button type='button' class='btn red-pink' onclick='modal11_action();' title='Add Customer'><i class='fa fa-plus'></i> Add Customer</button></label>
				<label style='float:right;'><button type='button' class='btn purple-soft' onclick='modal216_action();' title='Add Policy'><i class='fa fa-plus'></i> Add Policy</button></label>
				<br><label><input type='text' placeholder="Application #" class='floatlabel' name='app_num'></label>
				<label><input type='text' placeholder="Policy #" class='floatlabel' name='num'></label>
				<label><input type='text' placeholder="Policy Holder" class='floatlabel' name='holder'></label>
				<label><input type='text' placeholder="Policy Provider" class='floatlabel' name='provider'></label>
				<label><input type='text' placeholder="Agent" class='floatlabel' name='agent'></label>
				<label><input type='submit' class='submit_hidden'></label>
			</fieldset>
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
		               		<button type="submit" class="btn green" form='form347_popup_import_form' name='save'>Import</button>
		               		<button type="button" class="btn red" form='form347_popup_import_form' data-dismiss='modal' name='cancel'>Cancel</button>
		             	</div>
	                </form>
	            </div>
	        </div>
	    </div>

	</div>

    <script>
        function form347_header_ini()
        {
            var filter_fields=document.getElementById('form347_header');
			var appnum_filter=filter_fields.elements['app_num'];
            var num_filter=filter_fields.elements['num'];
            var owner_filter=filter_fields.elements['holder'];
			var provider_filter=filter_fields.elements['provider'];
			var agent_filter=filter_fields.elements['agent'];

			var appnum_data={data_store:'policies',return_column:'application_num'};
			set_my_filter_json(appnum_data,appnum_filter);

            var num_data={data_store:'policies',return_column:'policy_num'};
            set_my_filter_json(num_data,num_filter);

            var owner_data={data_store:'customers',return_column:'acc_name'};
            set_my_filter_json(owner_data,owner_filter);

			var provider_data={data_store:'policy_types',return_column:'issuer'};
            set_my_filter_json(provider_data,provider_filter);

			var agent_data={data_store:'staff',return_column:'acc_name'};
            set_my_filter_json(agent_data,agent_filter);

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

            var filter_fields=document.getElementById('form347_header');
			var fappnum=filter_fields.elements['app_num'].value;
            var fnum=filter_fields.elements['num'].value;
            var fholder=filter_fields.elements['holder'].value;
			var fprovider=filter_fields.elements['provider'].value;
			var fagent=filter_fields.elements['agent'].value;

            var paginator=$('#form347_body').paginator({'page_size':24});

			var columns={count:paginator.page_size(),
						start_index:paginator.get_index(),
						data_store:'policies',
						indexes:[{index:'id',value:fid},
								{index:'application_num',value:fappnum},
								{index:'policy_num',value:fnum},
								{index:'policy_holder',value:fholder},
								{index:'agent',value:fagent},
								{index:'status',exact:status_filter},
								{index:'issuer',value:fprovider}]};

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
				initialize_tabular_report_buttons(columns,'Policies','form347',function (item){});
                hide_loader();
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

		function form347_policy_holder_ids(policy_holders,func)
		{
			var id_data  = {data_store:'customers',indexes:[{index:'id'},
							{index:'acc_name',array:policy_holders}]};
			read_json_rows('form347',id_data,function(ids)
			{
				func(ids);
			});
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
						}
					}
				});
				// console.log(policies);
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
						if(policies[i][policy_name_index]==policy['name'])
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

		function form347_add_commissions(commissions_json,policy_bank,policy_data)
		{
			var date_array=String(fissue.value).split(/[\-\/]+/);;
			var month=parseInt(date_array[1]);
			var monthArray=[4,5,6,7,8,9];
			var first_half = (monthArray.indexOf(month)==-1) ? 'no' : 'yes';
			var data={
				"first_half_year":first_half,
				"sum_insured":fsum.value,
				"term":fterm.value,
				"preferred":fpreferred.value,
				"upsell": (fpremium.value>old_premium) ? 'yes' : 'no'
			};

			var commission_id = vUtil.newKey();
			commissions.forEach(function(commission)
			{
				commission_id++;
				if(commission.issue==ftype.value)
				{
					var add=true;
					var amount = parseFloat(commission.commission)*parseFloat(fpremium.value)/100;

					if(!vUtil.isBlank(commission.conditions) && commission.conditions!=[])
					{
						commission.conditions.forEach(function(cond)
						{
							if(!vUtil.isBlank(cond.exact) && data[cond.index]!=cond.exact)
							{
								add=false;
							}
							if(!vUtil.isBlank(cond.lowerbound) && data[cond.index]<cond.lowerbound)
							{
								add=false;
							}
							if(!vUtil.isBlank(cond.upperbound) && data[cond.index]>cond.upperbound)
							{
								add=false;
							}
						});
					}

					if(add)
					{
						var commission_json={data_store:'policy_commissions',
							data:[{index:'id',value:commission_id},
								{index:'application_num',value:fapp.value},
								{index:'commission_num',value:''},
								{index:'issuer',value:fcompany.value},
								{index:'policy_holder',value:fholder.value},
								{index:'amount',value:amount},
								{index:'agent',value:fagent.value},
								{index:'issue_date',value:vTime.unix({date:fissue.value})},
								{index:'commission_type',value:commission.type},
								{index:'status',value:'pending'},
								{index:'notes',value:''},
								{index:'last_updated',value:last_updated}]};
						create_json(commission_json);
					}
				}
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
			var template_button=form.elements['download'];
			var dummy_button=form.elements['file_dummy'];
			var import_button=form.elements['save'];

			var import_types_list = ['New Applications','MIS', 'Apollo Policies Search','Apollo Policies Sold', 'Max Policies','Max Renewals', 'Star Policies','ICICI Policies'];
			set_value_list_json(import_types_list,import_type);

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
						case 'New Applications':vImport.importData(content,form,form347_na_import,form347_na_import_validate);
												break;
						case 'MIS':vImport.importData(content,form,form347_mis_import,form347_mis_import_validate);
												break;
						case 'Apollo Policies Sold':vImport.importData(content,form,form347_ap_import,form347_ap_import_validate);
												break;
						case 'Apollo Policies Search':vImport.importData(content,form,form347_ar_import,form347_ar_import_validate);
												break;
						case 'Max Policies':vImport.importData(content,form,form347_mp_import,form347_mp_import_validate);
												break;
						case 'Max Renewals':vImport.importData(content,form,form347_mr_import,form347_mr_import_validate);
												break;
						case 'Star Policies':vImport.importData(content,form,form347_sp_import,form347_sp_import_validate);
												break;
						case 'ICICI Policies':vImport.importData(content,form,form347_ip_import,form347_ip_import_validate);
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
				case 'Max Policies':data_array=['First Name','Last Name','Full Name','Application Number',
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
				case 'Max Renewals': data_array=['First Name','Last Name','Full Name','Policy Number','Previous Policy Number',
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

        function form347_na_import_validate(data_array)
        {
            var validate_template_array=[{column:'policy number',required:'yes',regex:new RegExp('^[0-9a-zA-Z_., ()-]+$')},
                                    {column:'policy holder name',regex:new RegExp('^[0-9a-zA-Z _.,\'+@!$()-]+$')},
									{column:'policy holder phone',regex:new RegExp('^[0-9a-zA-Z _.,\'+@!$()-]+$')},
									{column:'policy holder email',regex:new RegExp('^[0-9a-zA-Z _.,\'+@!$()-]+$')},
									{column:'policy holder address',regex:new RegExp('^[0-9a-zA-Z _.,\'+@!$()/-]+$')},
									{column:'policy holder birthdate',regex:new RegExp('^[0-9]{2}\/[0-9]{2}\/[0-9]{4}')},
									{column:'issuer',regex:new RegExp('^[0-9a-zA-Z _.,\'+@!$()-]+$')},
									{column:'agent',regex:new RegExp('^[0-9a-zA-Z _.,\'+@!$()-]+$')},
									{column:'premium',regex:new RegExp('^[0-9 .]+$')},
									{column:'policy start date',regex:new RegExp('^[0-9]{2}\/[0-9]{2}\/[0-9]{4}')},
									{column:'policy end date',regex:new RegExp('^[0-9]{2}\/[0-9]{2}\/[0-9]{4}')},
									{column:'policy issue date',regex:new RegExp('^[0-9]{2}\/[0-9]{2}\/[0-9]{4}')},
									{column:'policy type',list:['life','health','car']},
									{column:'issue type',list:['fresh','renewal','portability']},
									{column:'status',list:['active','expired']}];

            var error_array=vImport.validate(data_array,validate_template_array);
            return error_array;
        }

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
			}

			form347_policy_bank(policies,'Product_Name','Apollo',function()
			{
				form347_policy_ids(policies,'Policy_Number','Apollo',function()
				{
					// console.log(policies);
					for(var i=0;i<policies.length;i++)
					{
						policies[i].start_time = vTime.unix({date:policies[i].Policy_start_date,format:'mm/dd/yyyy hh:mm:ss AM'});
						policies[i].end_time = vTime.unix({date:policies[i].Policy_end_date,format:'mm/dd/yyyy hh:mm:ss AM'});
						policies[i].issue_time = vTime.unix({date:policies[i].Policy_issue_date,format:'mm/dd/yyyy hh:mm:ss AM'});
						policies[i].term = ((policies[i].end_time-policies[i].start_time)/366>1) ? 'two years' : 'one year';
						policies[i].issued_in_quarter = vTime.quarter({time:policies[i].issue_time,format:'unix'});
						if(!vUtil.isBlank(policies[i].id))
						{
							var data_json_array=[{index:'id',value:policies[i].id},
				 					{index:'policy_name',value:policies[i].Product_Name},
									{index:'application_num',value:policies[i].Application_Number},
									{index:'member_id',value:policies[i].Member_ID},
									{index:'premium',value:policies[i].Premium},
									{index:'issuer',value:'Apollo'},
									{index:'term',value:policies[i].term},
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
			}

			form347_policy_bank(policies,'Product_Name','Apollo',function()
			{
				form347_policy_ids(policies,'Policy_Number','Apollo',function()
				{
					// console.log(policies);
					for(var i=0;i<policies.length;i++)
					{
						policies[i].start_time = vTime.unix({date:policies[i].Policy_start_date,format:'mm/dd/yyyy hh:mm:ss AM'});
						policies[i].end_time = vTime.unix({date:policies[i].Policy_end_date,format:'mm/dd/yyyy hh:mm:ss AM'});
						policies[i].issue_time = vTime.unix({date:policies[i].Policy_issue_date,format:'mm/dd/yyyy hh:mm:ss AM'});
						policies[i].term = ((policies[i].end_time-policies[i].start_time)/366>1) ? 'two years' : 'one year';
						policies[i].issued_in_quarter = vTime.quarter({time:policies[i].issue_time,format:'unix'});
						if(!vUtil.isBlank(policies[i].id))
						{
							var data_json_array=[{index:'id',value:policies[i].id},
				 					{index:'policy_name',value:policies[i].Product_Name},
									{index:'premium',value:policies[i].Premium},
									{index:'sum_insured',value:policies[i].Sum_Insured},
									{index:'issuer',value:'Apollo'},
									{index:'term',value:policies[i].term},
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

        function form347_na_import(data_array)
        {
          	var data_json={data_store:'policies',
		 					log:'yes',
		 					data:[],
		 					log_data:{title:'Policies',link_to:'form347'}};

			var customer_json={data_store:'customers',
							loader:'no',
							data:[]};

			var attribute_json={data_store:'attributes',
							loader:'no',
							data:[]};

			var counter=1;
			var last_updated=vTime.unix();

			data_array.forEach(function(row)
			{
				counter+=1;

				var holder=row['policy holder name']+" ("+row['policy holder phone']+")";
				var data_json_array=[{index:'id',value:row.id},
	 					{index:'policy_num',value:row['policy number'],unique:'yes'},
						{index:'policy_name',value:row['policy name']},
						{index:'agent',value:row['agent']},
						{index:'policy_holder',value:holder},
						{index:'issuer',value:row['issuer']},
						{index:'description',value:row['description']},
						{index:'premium',value:row['premium']},
						{index:'start_date',value:row['policy start date']},
						{index:'end_date',value:row['policy end date']},
						{index:'issue_date',value:row['policy issue date']},
						{index:'type',value:row['policy type']},
						{index:'issue_type',value:row['issue type']},
						{index:'status',value:row['status']},
	 					{index:'last_updated',value:last_updated}];

				data_json.data.push(data_json_array);

				var customer_json_array=[{index:'id',value:row.id},
	 					{index:'name',value:row['policy holder name']},
	 					{index:'phone',value:row['policy holder phone']},
						{index:'email',value:row['policy holder email']},
						{index:'address',value:row['policy holder address']},
						{index:'acc_name',value:holder,unique:'yes'},
	 					{index:'last_updated',value:last_updated}];

				customer_json.data.push(customer_json_array);

				var attribute_json_array=[{index:'id',value:row.id},
	 					{index:'value',value:row['policy holder birthdate']},
						{index:'attribute',value:'Birth Date'},
						{index:'type',value:'customer'},
						{index:'name',value:holder,unique:'yes'},
	 					{index:'last_updated',value:last_updated}];

				attribute_json.data.push(attribute_json_array);
			});

			create_batch_json(data_json);
			create_batch_json(customer_json);
			create_batch_json(attribute_json);
			update_batch_json(data_json);
			update_batch_json(customer_json);
			update_batch_json(attribute_json);

        };

    </script>
</div>
