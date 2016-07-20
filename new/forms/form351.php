<div id='form351' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='modal217_action();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form351_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form351_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form351_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li class="divider"> </li>
                    <li>
                        <a id='form351_upload' onclick=modal23_action(form351_import_template,form351_import,form351_import_validate);><i class='fa fa-upload'></i> Import</a>
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
					<form id='form351_header'></form>
						<th><input type='text' placeholder="Policy Name" class='floatlabel' name='name' form='form351_header'></th>
            			<th><input type='text' placeholder="Policy Type" class='floatlabel' name='type' form='form351_header'></th>
						<th><input type='text' placeholder="Accounts" class='floatlabel' name='account' form='form351_header'></th>
						<th><input type='text' placeholder="Description" class='floatlabel' name='description' form='form351_header'></th>
						<th><input type='text' placeholder="Details" readonly='readonly' form='form351_header'></th>
						<th><input type='submit' form='form351_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form351_body'>
			</tbody>
		</table>
	</div>

	<div class='modal_forms'>
		<a href='#form351_popup' data-toggle="modal" id='form351_popup_link'></a>
		<div id="form351_popup" class="modal fade draggable-modal" role="basic" tabindex="-1" aria-hidden="true">
			<div class="modal-dialog modal-full">
				<div class="modal-content">
					<form id='form351_popup_form' autocomplete="off">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
							<h4 class="modal-title">Commission Settings</h4>
						</div>
						<div class="modal-body">
						   <div class="scroller" style="height:80%;" data-always-visible="1" data-rail-visible1="1">
							 <form id='form351_popup_form' autocomplete="off">
								<fieldset>
									<button type="button" class='btn green' name='add_button'><i class='fa fa-plus'></i></button>
									<div id='form351_popup_columns'></div>
								</fieldset>
							 </form>
						   </div>
						 </div>
						<div class="modal-footer">
						<button type="submit" class="btn green" form='form351_popup_form' name='save'>Save</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>

	<script>
		function form351_header_ini()
		{
			var filter_fields=document.getElementById('form351_header');
			var faccount=filter_fields.elements['account'];
			var ftype=filter_fields.elements['type'];

			var account_data={data_store:'staff',return_column:'acc_name'};
			set_my_filter_json(account_data,faccount);
			set_static_filter_json('policy_types','type',ftype);

			$(filter_fields).off('submit');
			$(filter_fields).on('submit',function(event)
			{
				event.preventDefault();
				form351_ini();
			});
		};

		function form351_ini()
		{
			show_loader();
			var fid=$("#form351_link").attr('data_id');
			if(fid==null)
				fid="";

			$('#form351_body').html("");

			var filter_fields=document.getElementById('form351_header');
			var fname=filter_fields.elements['name'].value;
      		var ftype=filter_fields.elements['type'].value;
			var faccount=filter_fields.elements['account'].value;
			var fdesc=filter_fields.elements['description'].value;

			var paginator=$('#form351_body').paginator();

			var new_columns={count:paginator.page_size(),
					            start_index:paginator.get_index(),
					            data_store:'policy_types',
					            indexes:[{index:'id',value:fid},
            							{index:'name',value:fname},
                              			{index:'type',value:ftype},
            							{index:'issuer'},
										{index:'term'},
										{index:'preferred'},
										{index:'accounts',value:faccount},
            							{index:'description',value:fdesc}]};

			read_json_rows('form351',new_columns,function(results)
			{
				results.forEach(function(result)
				{
					var accounts_array=vUtil.jsonParse(result.accounts);
					var accounts_data="<ul id='form351_accounts_"+result.id+"'>";
					accounts_array.forEach(function(account)
					{
						accounts_data+="<li>"+account+"</li>";
					});
					accounts_data+="</ul>";

					var rowsHTML="<tr>";
						rowsHTML+="<form id='form351_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Name'>";
								rowsHTML+="<textarea readonly='readonly' form='form351_"+result.id+"'>"+result.name+"</textarea>";
							rowsHTML+="</td>";
              				rowsHTML+="<td data-th='Type'>";
								rowsHTML+="<input type='text' class='floatlabel' placeholder='Policy Type' readonly='readonly' form='form351_"+result.id+"' value='"+result.type+"'>";
								rowsHTML+="<textarea readonly='readonly' class='floatlabel' placeholder='Provider' form='form351_"+result.id+"'>"+result.issuer+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Accounts'>";
								rowsHTML+=accounts_data;
								rowsHTML+="<button type='button' class='btn yellow' name='account' title='Edit Accounts' onclick=\"modal226_action('"+result.id+"');\"><i class='fa fa-pencil'></i></button>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Description'>";
								rowsHTML+="<textarea class='dblclick_editable' readonly='readonly' form='form351_"+result.id+"'>"+result.description+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Details'>";
								rowsHTML+="<input type='text' class='dblclick_editable floatlabel' placeholder='Term' readonly='readonly' form='form351_"+result.id+"' value='"+result.term+"'>";
								rowsHTML+="<input type='text' class='dblclick_editable floatlabel' placeholder='Preferred' readonly='readonly' form='form351_"+result.id+"' value='"+result.preferred+"'>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form351_"+result.id+"' value='"+result.id+"' name='id'>";
								rowsHTML+="<button type='submit' class='btn green' name='save' form='form351_"+result.id+"' title='Save'><i class='fa fa-save'></i></button>";
								rowsHTML+="<button type='button' class='btn red' name='delete' form='form351_"+result.id+"' title='Delete' onclick='form351_delete_item($(this));'><i class='fa fa-trash'></i></button>";
								rowsHTML+="<button type='button' class='btn yellow' name='commissions' form='form351_"+result.id+"' title='Update Commission Settings' onclick=\"form351_popup_action('"+result.id+"');\"><i class='fa fa-money'></i></button>";
							rowsHTML+="</td>";
					rowsHTML+="</tr>";

					$('#form351_body').append(rowsHTML);
					var fields=document.getElementById("form351_"+result.id);
					var term=fields.elements[4];
					var preferred=fields.elements[5];

					set_static_value_list_json('policy_types','term',term);
					set_static_value_list_json('policy_types','preferred',preferred);

					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form351_update_item(fields);
					});
				});

				$('#form351').formcontrol();
				paginator.update_index(results.length);
				initialize_tabular_report_buttons(new_columns,'Policy Types','form351',function (item){});
				hide_loader();
			});
		};

		function form351_update_item(form)
		{
			if(is_update_access('form351'))
			{
				var name=form.elements[0].value;
				var desc=form.elements[3].value;
				var term=form.elements[4].value;
				var preferred=form.elements[5].value;
				var data_id=form.elements['id'].value;
				var last_updated=get_my_time();
				var data_json={data_store:'policy_types',
	 				data:[{index:'id',value:data_id},
	 					{index:'description',value:desc},
						{index:'term',value:term},
						{index:'preferred',value:preferred},
	 					{index:'last_updated',value:last_updated}]};
				update_json(data_json);
				$(form).readonly();
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form351_delete_item(button)
		{
			if(is_delete_access('form351'))
			{
				modal115_action(function()
				{
					var form_id=$(button).attr('form');
					var form=document.getElementById(form_id);

					var name=form.elements[0].value;
					var provider=form.elements[2].value;
					var data_id=form.elements['id'].value;
					var last_updated=get_my_time();

					var data_json={data_store:'policy_types',
	 				log:'yes',
	 				data:[{index:'id',value:data_id}],
	 				log_data:{title:'Deleted',notes:'Policy type '+name+' from '+provider,link_to:'form351'}};

					delete_json(data_json);
					$(button).parent().parent().remove();
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form351_popup_action(policy_id)
		{
			var form=document.getElementById('form351_popup_form');
			var add_button=form.elements['add_button'];

			var attribute_label=document.getElementById('form351_popup_columns');
			attribute_label.innerHTML="";

			$(add_button).off('click');
			$(add_button).on('click',function ()
			{
				var id=get_new_key();
				var content="<div class='row' id='form351_popup_"+id+"'>"+
								"<div class='col-md-3'>"+
									"<input placeholder='Commission Type' class='floatlabel' name='type' type='text'>"+
								"</div>"+
								"<div class='col-md-2'>"+
									"<input placeholder='Issue Type' class='floatlabel' name='issue' type='text'>"+
								"</div>"+
								"<div class='col-md-4'>"+
									"<textarea placeholder='Conditions' class='floatlabel' name='conditions'></textarea>"+
								"</div>"+
								"<div class='col-md-2'>"+
									"<input placeholder='Commission %' class='floatlabel' name='commission' type='number' step='any'>"+
								"</div>"+
								"<div class='col-md-1'>"+
									"<button type='button' class='btn red' onclick=$(this).parent().parent().remove();><i class='fa fa-trash'></i></button>"+
								"</div>"+
							"</div>";
				$(attribute_label).append(content);

				var row_element=$('#form351_popup_'+id);
				var type_element=$(row_element).find("input[name='type']")[0];
				var issue_element=$(row_element).find("input[name='issue']")[0];

				set_static_value_list_json('policy_types','commissions',type_element);
				set_static_value_list_json('policies','issue_type',issue_element);

				$(form).formcontrol();
			});

			$("#form351_popup_link").click();

			var attributes_data={data_store:'policy_types',count:1,return_column:'commissions',
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
									"<div class='col-md-3'>"+
										"<input placeholder='Commission Type' readonly='readonly' class='floatlabel' value='"+fvalue.type+"' name='type' type='text'>"+
									"</div>"+
									"<div class='col-md-2'>"+
										"<input placeholder='Issue Type' readonly='readonly' class='floatlabel' value='"+fvalue.issue+"' name='issue' type='text'>"+
									"</div>"+
									"<div class='col-md-4'>"+
										"<textarea placeholder='Conditions' class='floatlabel' name='conditions'>"+fvalue.conditions+"</textarea>"+
									"</div>"+
									"<div class='col-md-2'>"+
										"<input placeholder='Commission %' readonly='readonly' class='floatlabel' value='"+fvalue.commission+"' name='commission' type='number' step='any'>"+
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
				if(is_update_access('form351'))
				{
					var last_updated=get_my_time();
					var returns_column_array=[];

					$("#form351_popup_columns>div").each(function()
					{
						var return_obj={type:$(this).find("input[name='type']").val(),
										issue:$(this).find("input[name='issue']").val(),
										conditions:$(this).find("textarea[name='conditions']").val(),
										commission:$(this).find("input[name='commission']").val()};
						returns_column_array.push(return_obj);
					});

					var return_columns=JSON.stringify(returns_column_array);
					var search_json={data_store:'policy_types',
			 				data:[{index:'id',value:policy_id},
			 					{index:'commissions',value:return_columns},
			 					{index:'last_updated',value:last_updated}]};
					update_json(search_json);
				}
				else
				{
					$("#modal2_link").click();
				}
				$(form).find(".close").click();
			});
		}


		function form351_import_template()
		{
			var data_array=['id','name','type','issuer','description','term','preferred','commissions'];
			my_array_to_csv(data_array);
		};

		function form351_import_validate(data_array)
		{
			var validate_template_array=[{column:'name',required:'yes',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
                                  {column:'type',required:'yes',list:['medical','mon-medical']},
								  {column:'term',required:'yes',list:['one year','two years','one year, two years']},
								  {column:'preferred',required:'yes',list:['yes','no']},
                                  {column:'issuer',required:'yes',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
                				  {column:'description',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')}];

			var error_array=validate_import_array(data_array,validate_template_array);
			return error_array;
		}

		function form351_import(data_array,import_type)
		{
			var data_json={data_store:'policy_types',
 					log:'yes',
 					data:[],
 					log_data:{title:'Policy Types',link_to:'form351'}};

			var counter=1;
			var last_updated=get_my_time();

			data_array.forEach(function(row)
			{
				counter+=1;
				if(import_type=='create_new')
				{
					row.id=last_updated+counter;
				}

				var data_json_array=[{index:'id',value:row.id},
	 					{index:'name',value:row.name},
	 					{index:'type',value:row.type},
						{index:'term',value:row.term},
						{index:'preferred',value:row.preferred},
						{index:'issuer',value:row.issuer},
	 					{index:'description',value:row.description},
						{index:'commissions',value:row.commissions},
	 					{index:'last_updated',value:last_updated}];

				data_json.data.push(data_json_array);
			});

			if(import_type=='create_new')
			{
				create_batch_json(data_json);
			}
			else
			{
				update_batch_json(data_json);
			}
		};

	</script>
</div>
