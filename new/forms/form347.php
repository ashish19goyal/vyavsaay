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
						<a onclick='modal11_action();'><i class='fa fa-plus'> Add Customer</i></a>
					</li>
					<li>
						<a onclick='modal216_action();'><i class='fa fa-plus'> Add Policy</i></a>
					</li>
					<li class="divider"> </li>

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
                        <a id='form347_upload' onclick=modal221_action(form347_import_template,form347_import,form347_import_validate);><i class='fa fa-upload'></i> Import</a>
                    </li>
                </ul>
            </div>
        </div>
	</div>

	<div class="portlet-body">
		<form id='form347_header' autocomplete="off">
			<fieldset>
				<label><input type='text' placeholder="Policy #" class='floatlabel' name='num'></label>
				<label><input type='text' placeholder="Policy Holder" class='floatlabel' name='holder'></label>
				<label><input type='text' placeholder="Policy Provider" class='floatlabel' name='provider'></label>
				<label><input type='text' placeholder="Agent" class='floatlabel' name='agent'></label>
				<label><input type='submit' class='submit_hidden'></label>
			</fieldset>
		</form>
		<br>
		<div id='form347_body' class='row'>

		</div>
	</div>

    <script>
        function form347_header_ini()
        {
            var filter_fields=document.getElementById('form347_header');
            var num_filter=filter_fields.elements['num'];
            var owner_filter=filter_fields.elements['holder'];
						var provider_filter=filter_fields.elements['provider'];
						var agent_filter=filter_fields.elements['agent'];

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
            var fnum=filter_fields.elements['num'].value;
            var fholder=filter_fields.elements['holder'].value;
						var fprovider=filter_fields.elements['provider'].value;
						var fagent=filter_fields.elements['agent'].value;

            var paginator=$('#form347_body').paginator({'page_size':24});

						var columns={count:paginator.page_size(),
												start_index:paginator.get_index(),
												data_store:'policies',
												indexes:[{index:'id',value:fid},
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
                                              "<a onclick=\"show_object('policies','"+result.policy_num+"');\"><textarea readonly='readonly' name='name' class='floatlabel' placeholder='Policy #' form='form347_"+result.id+"'>"+result.policy_num+"</textarea></a>"+
                                              "<a onclick=\"show_object('customers','"+result.policy_holder+"');\"><textarea readonly='readonly' class='floatlabel' placeholder='Holder' name='holder' form='form347_"+result.id+"'>"+result.policy_holder+"</textarea></a>"+
																							"<input type='text' readonly='readonly' class='floatlabel' placeholder='Provider' name='provider' form='form347_"+result.id+"' value='"+result.issuer+"'>"+
																							"<input type='text' readonly='readonly' class='floatlabel' placeholder='Agent' name='agent' form='form347_"+result.id+"' value='"+result.agent+"'>"+
	                                    	      "<input type='hidden' form='form347_"+result.id+"' name='id' value='"+result.id+"'>"+
	           	    							        			"<button type='button' class='btn red' form='form347_"+result.id+"' name='delete' title='Delete' onclick='form347_delete_item($(this));'><i class='fa fa-2x fa-trash'></i></button>"+
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
                    var last_updated=vTime.unix();

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

        function form347_import_template()
        {
            var data_array=['id','policy number','description','issuer','agent','premium','policy start date','policy end date','policy issue date','policy type','issue type','policy holder name','policy holder phone','policy holder email','policy holder address','policy holder birthdate','status'];
            my_array_to_csv(data_array);
        };

        function form347_import_validate(data_array)
        {
            var validate_template_array=[{column:'policy number',required:'yes',regex:new RegExp('^[0-9a-zA-Z_., ()-]+$')},
                                    {column:'policy holder name',regex:new RegExp('^[0-9a-zA-Z _.,\'+@!$()-]+$')},
																		{column:'policy holder phone',regex:new RegExp('^[0-9a-zA-Z _.,\'+@!$()-]+$')},
																		{column:'policy holder email',regex:new RegExp('^[0-9a-zA-Z _.,\'+@!$()-]+$')},
																		{column:'policy holder address',regex:new RegExp('^[0-9a-zA-Z _.,\'+@!$()-]+$')},
																		{column:'policy holder birthdate',regex:new RegExp('^[0-9]{2}\/[0-9]{2}\/[0-9]{4}')},
																		{column:'issuer',regex:new RegExp('^[0-9a-zA-Z _.,\'+@!$()-]+$')},
																		{column:'agent',regex:new RegExp('^[0-9a-zA-Z _.,\'+@!$()-]+$')},
																		{column:'premium',regex:new RegExp('^[0-9 .]+$')},
																		{column:'policy start date',regex:new RegExp('^[0-9]{2}\/[0-9]{2}\/[0-9]{4}')},
																		{column:'policy end date',regex:new RegExp('^[0-9]{2}\/[0-9]{2}\/[0-9]{4}')},
																		{column:'policy issue date',regex:new RegExp('^[0-9]{2}\/[0-9]{2}\/[0-9]{4}')},
																		{column:'policy type',list:['life','health','car']},
																		{column:'issue type',list:['new','renewed','ported']},
																		{column:'status',list:['active','expired']}];

            var error_array=validate_import_array(data_array,validate_template_array);
            return error_array;
        }

        function form347_import(data_array)
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
