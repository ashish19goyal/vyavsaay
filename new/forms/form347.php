<div id='form347' class='tab-pane portlet box yellow-saffron'>
	<div class="portlet-title">
		<div class='caption'>
			<div class='btn-group' id='form347_status' data-toggle='buttons'>
				<label class='btn yellow-crusta current active' onclick=form347_ini('current');><input name='current' type='radio' class='toggle'>Active</label>
				<label class='btn yellow-crusta expired' onclick=form347_ini('expired');><input type='radio' name='expired' class='toggle'>Expired</label>
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
				<label style='float:right;'><button type='button' class='btn purple-soft' onclick='form347_popup_add_policy_action();' title='Add Policy'><i class='fa fa-plus'></i> Add Policy</button></label>
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

		<a href='#form347_popup_add_policy' data-toggle="modal" id='form347_popup_add_policy_link'></a>
		<div id="form347_popup_add_policy" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
			<div class="modal-dialog modal-full">
				<div class="modal-content">
					<form id='form347_popup_add_policy_form' autocomplete="off">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
							<h4 class="modal-title">Add Policy</h4>
						</div>
						<div class="modal-body">
							<div class="scroller" style="height:50%;" data-always-visible="1" data-rail-visible1="1">
								<div class="row">
									<div class="col-sm-12 col-md-2">Application Number</div>
									<div class="col-sm-12 col-md-4"><input type='text' form='form347_popup_add_policy_form' required name='app_number'></div>
									<div class="col-sm-12 col-md-2">Issuing Company</div>
									<div class="col-sm-12 col-md-4"><input type='text' form='form347_popup_add_policy_form' name='company'></div>
								</div>
								<div class="row">
									<div class="col-sm-12 col-md-2">Preferred</div>
									<div class="col-sm-12 col-md-4"><input type='text' form='form347_popup_add_policy_form' name='preferred'></div>
									<div class="col-sm-12 col-md-2">Policy Type</div>
									<div class="col-sm-12 col-md-4"><input type='text' form='form347_popup_add_policy_form' name='policy_type'></div>
								</div>
								<div class="row">
									<div class="col-sm-12 col-md-2">Policy Term</div>
									<div class="col-sm-12 col-md-4"><input type='text' form='form347_popup_add_policy_form' name='term'></div>
									<div class="col-sm-12 col-md-2">Policy Name</div>
									<div class="col-sm-12 col-md-4"><input type='text' required form='form347_popup_add_policy_form' name='policy_name'></div>
								</div>
								<div class="row">
									<div class="col-sm-12 col-md-2">Policy Holder</div>
									<div class="col-sm-12 col-md-4"><input type='text' required form='form347_popup_add_policy_form' name='holder'></div>
									<div class="col-sm-12 col-md-2">Sum Insured</div>
									<div class="col-sm-12 col-md-4"><input type='text' required form='form347_popup_add_policy_form' name='sum'></div>
								</div>
								<div class="row">
									<div class="col-sm-12 col-md-2">Adults</div>
									<div class="col-sm-12 col-md-4"><input type='text' required form='form347_popup_add_policy_form' name='adults'></div>
									<div class="col-sm-12 col-md-2">Children</div>
									<div class="col-sm-12 col-md-4"><input type='text' required form='form347_popup_add_policy_form' name='children'></div>
								</div>
								<div class="row">
									<div class="col-sm-12 col-md-2">Age (oldset member)</div>
									<div class="col-sm-12 col-md-4"><input type='number' step='any' form='form347_popup_add_policy_form' min='0' name='age'></div>
									<div class="col-sm-12 col-md-2">Premium</div>
									<div class="col-sm-12 col-md-4"><input type='number' required form='form347_popup_add_policy_form' step='any' min='0' name='premium'></div>
								</div>
								<div class="row">
									<div class="col-sm-12 col-md-2">Short Premium</div>
									<div class="col-sm-12 col-md-4"><input type='number' form='form347_popup_add_policy_form' step='any' name='spremium' min='0' value='0'></div>
									<div class="col-sm-12 col-md-2">Discount</div>
									<div class="col-sm-12 col-md-4"><input type='number' form='form347_popup_add_policy_form' step='any' name='discount' min='0' value='0'></div>
								</div>
								<div class="row">
									<div class="col-sm-12 col-md-2">Type</div>
									<div class="col-sm-12 col-md-4"><input type='text' required form='form347_popup_add_policy_form' name='type'></div>
									<div class='col-sm-12 col-md-6'>
										<div class="col-sm-12 col-md-4">Ported From</div>
										<div class="col-sm-12 col-md-8"><input type='text' form='form347_popup_add_policy_form' name='ported_from'></div>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-12 col-md-2">Source</div>
									<div class="col-sm-12 col-md-4"><input type='text' form='form347_popup_add_policy_form' name='source'></div>
									<div class="col-sm-12 col-md-2">Team Lead</div>
									<div class="col-sm-12 col-md-4"><input type='text' form='form347_popup_add_policy_form' name='lead'></div>
								</div>
								<div class="row">
									<div class="col-sm-12 col-md-2">Sales Manager</div>
									<div class="col-sm-12 col-md-4"><input type='text' form='form347_popup_add_policy_form' name='sales'></div>
									<div class="col-sm-12 col-md-2">Tele-Caller</div>
									<div class="col-sm-12 col-md-4"><input type='text' form='form347_popup_add_policy_form' name='caller'></div>
								</div>
								<div class="row">
									<div class="col-sm-12 col-md-2">Agent</div>
									<div class="col-sm-12 col-md-4"><input type='text' required form='form347_popup_add_policy_form' name='agent'></div>
									<div class="col-sm-12 col-md-2">Attachment</div>
									<div class="col-sm-12 col-md-4">
										<input type="file" form='form347_popup_add_policy_form' name='file' style='display:none' multiple>
										<button type='button' name='file_dummy' form='form347_popup_add_policy_form' class='btn yellow-saffron'>Select File</button>
									</div>
								</div>
							</div>
						</div>
						<div class="modal-footer">
							<button type="submit" class="btn green" form='form347_popup_add_policy_form' name='save'>Add</button>
							<button type="button" class="btn red" form='form347_popup_add_policy_form' data-dismiss='modal' name='cancel'>Cancel</button>
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

			var status_filter='active';
			if(typeof policy_type!='undefined' && policy_type=='expired')
			{
			  status_filter='expired';
			  $('#form347_status').find('label.expired').addClass('active');
			  $('#form347_status').find('label.current').removeClass('active');
			}
			else
			{
			  $('#form347_status').find('label.current').addClass('active');
			  $('#form347_status').find('label.expired').removeClass('active');
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

		function form347_policy_ids(policies,policy_num_index,func)
		{
			var policy_nums = vUtil.arrayColumn(policies,policy_num_index);
			var id_data  = {data_store:'policies',indexes:[{index:'id'},{index:'policy_num',array:policy_nums}]};
			read_json_rows('form347',id_data,function(ids)
			{
				ids.forEach(function(id)
				{
					policies.forEach(function(policy)
					{
						if(policy[policy_num_index]==id['policy_num'])
						{
							policy['id'] = id['id'];
						}
					});
				});
				func(policies);
			});
		}

		function form347_add_commissions()
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

			var import_types_list = ['New Applications','MIS','Apollo Policies', 'Apollo Renewals', 'Max Policies','Max Renewals', 'Star Policies','ICICI Policies'];
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
						case 'Apollo Policies':vImport.importData(content,form,form347_ap_import,form347_ap_import_validate);
												break;
						case 'Apollo Renewals':vImport.importData(content,form,form347_ar_import,form347_ar_import_validate);
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


		function form347_popup_add_policy_action()
		{
			var form=document.getElementById('form347_popup_add_policy_form');
			var fapp=form.elements['app_number'];
			var fcompany=form.elements['company'];
			var fpreferred=form.elements['preferred'];
			var fptype=form.elements['policy_type'];
			var fterm=form.elements['term'];
			var fpname=form.elements['policy_name'];
			var fholder=form.elements['holder'];
			var fsum=form.elements['sum'];
			var fadults=form.elements['adults'];
			var fchild=form.elements['children'];
			var fage=form.elements['age'];
			var fpremium=form.elements['premium'];
			var fshort_premium=form.elements['spremium'];
			var fdiscount=form.elements['discount'];
			var ftype=form.elements['type'];
			var fported_from=form.elements['ported_from'];
			var fsource=form.elements['source'];
			var flead=form.elements['lead'];
			var fmanager=form.elements['sales'];
			var fcaller=form.elements['caller'];
			var fagent=form.elements['agent'];
			var select_file=form.elements['file'];
			var dummy_button=form.elements['file_dummy'];

			$(dummy_button).off('click');
			$(dummy_button).on('click',function (e)
			{
				e.preventDefault();
				$(select_file).trigger('click');
			});

			dummy_button.setAttribute('class','btn red-sunglo');
			select_file.value="";

			$(select_file).off('change');
			$(select_file).on('change',function ()
			{
				var file_name=select_file.value;
				if(file_name!="")
				{
					dummy_button.setAttribute('class','btn green-jungle');
				}
				else
				{
					dummy_button.setAttribute('class','btn red-sunglo');
					select_file.value="";
				}
			});

			fapp.value="";
			fcompany.value="";
			fpreferred.value="";
			fptype.value="";
			fterm.value="";
			fpname.value="";
			fholder.value="";
			fsum.value="";
			fadults.value="";
			fchild.value="";
			fage.value="";
			fpremium.value="";
			fshort_premium.value="";
			fdiscount.value="";
			ftype.value="fresh";
			fported_from.value="";
			fsource.value="";
			flead.value="";
			fmanager.value="";
			fcaller.value="";
			fagent.value="";

			set_value_list_json(['fresh','portability'],ftype);
			set_value_list_json([100000,200000,300000,400000,500000,700000,750000,1000000,1500000,2000000,2500000,5000000,10000000,20000000,50000000],fsum);
			set_value_list_json([1,2],fadults);
			set_value_list_json([0,1,2,3],fchild);

			set_static_value_list_json('policies','sales source',fsource);

			var name_data={data_store:'policy_types',return_column:'name'};
			set_my_value_list_json(name_data,fpname);

			function policy_filtering()
			{
				fpname.value="";
				var name_data={data_store:'policy_types',return_column:'name',
								indexes:[{index:'issuer',value:fcompany.value},
										{index:'term',value:fterm.value},
										{index:'preferred',value:fpreferred.value}]};
				set_my_value_list_json(name_data,fpname);
			};

			vUtil.onChange(fcompany,policy_filtering);
			vUtil.onChange(fterm,policy_filtering);
			vUtil.onChange(fpreferred,policy_filtering);

			function premium_calculation()
			{
				fpremium.value="";
				var premium_data={data_store:'policy_premiums',return_column:'premium_amount',
								indexes:[{index:'policy_name',exact:fpname.value},
										{index:'sum_insured',exact:fsum.value},
										{index:'adults',exact:fadults.value},
										{index:'children',exact:fchild.value},
										{index:'age_lower',upperbound:fage.value},
										{index:'age_upper',lowerbound:fage.value}]};
				set_my_value_json(premium_data,fpremium);
			};
			vUtil.onChange(fsum,premium_calculation);
			vUtil.onChange(fadults,premium_calculation);
			vUtil.onChange(fchild,premium_calculation);
			vUtil.onChange(fage,premium_calculation);

			var holder_data={data_store:'customers',return_column:'acc_name'};
			set_my_value_list_json(holder_data,fholder);

			var company_data={data_store:'policy_types',return_column:'issuer'};
			set_my_value_list_json(company_data,fcompany);

			var lead_data={data_store:'attributes',return_column:'name',
							indexes:[{index:'type',exact:'staff'},
									{index:'attribute',exact:'Designation'},
									{index:'value',exact:'Team Lead'}]};
			set_my_value_list_json(lead_data,flead);

			var manager_data={data_store:'attributes',return_column:'name',
							indexes:[{index:'type',exact:'staff'},
									{index:'attribute',exact:'Designation'},
									{index:'value',exact:'Sales Manager'}]};
			set_my_value_list_json(manager_data,fmanager);

			var caller_data={data_store:'attributes',return_column:'name',
							indexes:[{index:'type',exact:'staff'},
									{index:'attribute',exact:'Designation'},
									{index:'value',exact:'Tele-Caller'}]};
			set_my_value_list_json(caller_data,fcaller);

			var agent_data={data_store:'attributes',return_column:'name',
							indexes:[{index:'type',exact:'staff'},
									{index:'attribute',exact:'Designation'},
									{index:'value',exact:'Agent'}]};
			set_my_value_list_json(agent_data,fagent);

			set_static_value_list_json('policy_types','type',fptype);
			set_static_value_list_json('policy_types','term',fterm);
			set_static_value_list_json('policy_types','preferred',fpreferred);

			$(fported_from).parent().parent().hide();

			vUtil.onChange(ftype,function()
			{
				if(ftype.value=='portability')
				{
					$(fported_from).parent().parent().show();
				}
			});

			var description = "";
			vUtil.onChange(fpname,function()
			{
				var policy_data={data_store:'policy_types',count:1,
								indexes:[{index:'issuer'},
										{index:'description'},
										{index:'type'},
										{index:'term'},
										{index:'preferred'},
										{index:'accounts'},
										{index:'name',exact:fpname.value}]};
				read_json_rows('',policy_data,function(policies)
				{
					if(policies.length>0)
					{
						var accounts_array=vUtil.jsonParse(policies[0].accounts);
						if(accounts_array.length>0)
						{
							fagent.value = accounts_array[0];
						}
						fcompany.value = policies[0].issuer;
						fpreferred.value = policies[0].preferred;
						description = policies[0].description;
					}
				});

				premium_calculation();
			});

			$(form).off("submit");
			$(form).on("submit",function(event)
			{
				event.preventDefault();
				if(is_create_access('form347'))
				{
					//saving attachments
					var last_updated=vTime.unix();
					var attachments = [];
					var domain=get_session_var('domain');
					var files = select_file.files;
					// console.log(files);
					var counter=files.length;
					for(var i=0; i<files.length; i++)
					{
						var file=files[i];
						var contentType=file.type;
						var file_attr=file.name.split('.');
						var filetype=file_attr[file_attr.length-1];
						vUtil.fileToDataUrl(file,function(dataURL)
						{
							if(dataURL!="")
							{
								var doc_name=domain+vTime.unix()+file.name;
								var doc_mapping={name:file.name,url:doc_name};
								attachments.push(doc_mapping);

				                var data_json={type:'create',
				                           bucket:'vyavsaay-documents',
				                           blob: dataURL,
				                           name:doc_name,
				                           description:'',
				                           content_type:contentType};
								s3_object(data_json);
								counter--;
							}
						});
					}

					var wait=setInterval(function()
					{
						if(counter==0)
						{
							clearInterval(wait);

							var attachment_string=JSON.stringify(attachments);
							var data_json={data_store:'policies',
							data:[{index:'id',value:get_new_key()},
								{index:'application_num',value:fapp.value,unique:'yes'},
								{index:'policy_num',value:""},
								{index:'policy_name',value:fpname.value},
								{index:'description',value:description},
								{index:'issuer',value:fcompany.value},
								{index:'policy_holder',value:fholder.value},
								{index:'premium',value:fpremium.value},
								{index:'discount',value:fdiscount.value},
								{index:'short_premium',value:fshort_premium.value},
								{index:'agent',value:fagent.value},
								{index:'type',value:fptype.value},
								{index:'term',value:fterm.value},
								{index:'preferred',value:fpreferred.value},
								{index:'issue_type',value:ftype.value},
								{index:'ported_source',value:fported_from.value},
								{index:'sum_insured',value:fsum.value},
								{index:'adults',value:fadults.value},
								{index:'children',value:fchild.value},
								{index:'age',value:fage.value},
								{index:'team_lead',value:flead.value},
								{index:'sales_manager',value:fmanager.value},
								{index:'tele_caller',value:fcaller.value},
								{index:'sales_source',value:fsource.value},
								{index:'attachments',value:attachment_string},
								{index:'status',value:'applied'},
								{index:'last_updated',value:last_updated}]};
							create_json(data_json);
						}
					},500);
				}
				else
				{
					$("#modal2_link").click();
				}
				$(form).find(".close").click();
			});

			$("#form347_popup_add_policy_link").click();
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
				case 'Apollo Policies':data_array=['Main_Member_Name','Product_Name','Policy_Number',
													'Premium','Sum_Insured','Policy_issue_date','Policy_start_date',
													'Policy_end_date','Address_of_main_member'];
													break;
				case 'Apollo Renewals':data_array=['Policy_Number','Member_Name','Product_Name',
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
