function initialize_questionnaires(id,ques_name)
{
	var fields_data={data_store:'ques_fields',
						indexes:[{index:'id'},
									{index:'ques_id',exact:id},
									{index:'name'},
									{index:'display_name'},
									{index:'description'},
									{index:'type'},
									{index:'fvalues'},
									{index:'weight'},
									{index:'dynamic_values'},
									{index:'fcol'},
									{index:'forder'},
									{index:'freq'}]};
	read_json_rows('',fields_data,function(fields)
	{
		var previous_submissions="<a class='btn btn-circle grey btn-outline btn-sm' onclick=previous_questionnaires('"+id+"','"+ques_name+"',0);>Submissions List <i class='fa fa-bars'></i></a>";
		$("#"+ques_name+" .caption").html(previous_submissions);

		var content="<form id='"+ques_name+"_ques_header'>"+
							"<fieldset>"+
								"<input type='hidden'>"+
								"<div class='row'>"+
									"<div class='col-md-4 col-sm-4'><b>Submitter</b></div>"+
									"<div class='col-md-8 col-sm-8'><input type='text' readonly='readonly'></div>"+
								"</div>"+
								"<div class='row'>"+
									"<div class='col-md-4 col-sm-4'><b>Submission Date</b></div>"+
									"<div class='col-md-8 col-sm-8'><input type='text' readonly='readonly'></div>"+
								"</div>"+
							"</fieldset></form>"+
							"<form autocomplete='off' id='"+ques_name+"_ques_main'><fieldset>";

		fields.sort(function(a,b)
		{
			if(parseInt(a.forder)>parseInt(b.forder))
			{	return 1;}
			else
			{	return -1;}
		});

		content+="<input type='hidden'>";
		content+="<input type='hidden'>";

		var dynamic_fields=[];
		var field_id_array=[];

		fields.forEach(function(field)
		{
			field_id_array.push({id:field.id});
			var required='';
			if(field.freq=='checked')
				required='required';
			var field_desc="";
			if(field.description!="" && field.description!=null)
			{
				field_desc=" ("+field.description+")";
			}

			switch(field.type)
			{
				case 'text':content+="<div class='row' title='"+field_desc+"'>"+
												"<div class='col-md-4 col-sm-4'><b>"+field.display_name+"</b></div>"+
												"<div class='col-md-8 col-sm-8'><input id='field"+id+"_"+field.id+"' data-weight='"+field.weight+"' type='text' "+required+"></div>"+
											"</div>";
								break;
				case 'number':content+="<div class='row' title='"+field_desc+"'>"+
												"<div class='col-md-4 col-sm-4'><b>"+field.display_name+"</b></div>"+
												"<div class='col-md-8 col-sm-8'><input id='field"+id+"_"+field.id+"' data-weight='"+field.weight+"' type='number' step='any' "+required+"></div>"+
											"</div>";
								break;
				case 'value list':content+="<div class='row' title='"+field_desc+"'>"+
														"<div class='col-md-4 col-sm-4'><b>"+field.display_name+"</b></div>"+
														"<div class='col-md-8 col-sm-8'><select id='field"+id+"_"+field.id+"' data-weight='"+field.weight+"' "+required+">";
										var values_array=field.fvalues.split(";");
										values_array.forEach(function(fvalue)
										{
											var kvp=fvalue.split(":");
											content+="<option value='"+kvp[1]+"'>"+kvp[0]+"</option>";
										});
										content+="</select></div></div>";
										break;
				case 'dynamic value list':content+="<div class='row' title='"+field_desc+"'>"+
																	"<div class='col-md-4 col-sm-4'><b>"+field.display_name+"</b></div>"+
																	"<div class='col-md-8 col-sm-8'><input type='text' id='field"+id+"_"+field.id+"' data-weight='"+field.weight+"' "+required+"></div>"+
																"</div>";
												var dynamic_field=new Object();
												dynamic_field.id=field.id;
												dynamic_field.dynamic_values=vUtil.jsonParse(field.dynamic_values);
												dynamic_fields.push(dynamic_field);
												break;
				case 'textarea':content+="<div class='row' title='"+field_desc+"'>"+
														"<div class='col-md-4 col-sm-4'><b>"+field.display_name+"</b></div>"+
														"<div class='col-md-8 col-sm-8'><textarea id='field"+id+"_"+field.id+"' data-weight='"+field.weight+"' "+required+"></textarea></div>"+
													"</div>";
													break;
			}
		});
		var fields_json=JSON.stringify(field_id_array);
		content+="<div class='row'>"+
						"<div class='col-md-8 col-sm-8 pull-right'><input type='submit' value='Submit' class='btn green' onclick=event.preventDefault();"+ques_name+"_submit_action('"+id+"','"+ques_name+"','"+fields_json+"');></div>"+
					"</div>"+
				"</fieldset></form>";
		$("#"+ques_name+" .portlet-body").html(content);

		dynamic_fields.forEach(function (dynamic_field)
		{
			var filter_element=document.getElementById('field'+id+'_'+dynamic_field.id);
			set_my_value_list_json(dynamic_field.dynamic_values,filter_element);
		});
		//function to submit the questionnaire
		var ques_form=document.getElementById(ques_name+"_ques_main");
		var reviewer_filter=ques_form.elements[1];
		var approver_filter=ques_form.elements[2];

		var submit_function="";

		var reviewer_data={data_store:'ques_struct',count:1,
								indexes:[{index:'id',value:id},{index:'reviewer'},{index:'approver'}]};
		read_json_rows('',reviewer_data,function(people)
		{
			if(people.length>0)
			{
				reviewer_filter.value=people[0].reviewer;
				approver_filter.value=people[0].approver;
			}
		});

		var ques_header=document.getElementById(ques_name+"_ques_header");
		ques_header.elements[1].value=vUtil.newKey();
		ques_header.elements[2].value=get_account_name();
		ques_header.elements[3].value=vTime.date();
	});
}

function previous_questionnaires(id,ques_name,start_index)
{
	show_loader();
	var content="<table class='table table-striped table-bordered table-hover dt-responsive no-more-tables' width='100%'>"+
								"<thead>"+
									"<tr>"+
											"<th>Id</th>"+
											"<th>Submitter</th>"+
											"<th>Submission Date</th>"+
											"<th>Status</th>"+
											"<th></th>"+
									"</tr>"+
								"</thead>"+
								"<tbody id='"+ques_name+"_body'>"+
								"</tbody>"+
							"</table>";

	$("#"+ques_name+" .portlet-body").html(content);
	var tbody=document.getElementById(ques_name+'_body');

	var paginator=$('#'+ques_name+'_body').paginator();

	var ques_data={data_store:'ques_data',
									count:paginator.page_size(),
									start_index:paginator.get_index(),
									indexes:[{index:'id'},{index:'ques_struct_id',exact:id},{index:'submitter'},
													{index:'status'},{index:'sub_date'}]};

	read_json_rows('',ques_data,function(questionnaires)
	{
		questionnaires.forEach(function(result)
		{
			var update=true;
			var rowsHTML="<tr>";
					rowsHTML+="<td data-th='Id'>";
						rowsHTML+="<a onclick=\"filled_questionnaires('"+id+"','"+ques_name+"','"+result.id+"','"+result.submitter+"','"+result.sub_date+"')\">"+result.id+"</a>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Submitter'>";
						rowsHTML+=result.submitter;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Submission Date'>";
						rowsHTML+=get_my_past_date(result.sub_date);
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Status' id='ques_status_"+result.id+"'>";
						rowsHTML+=result.status;
					rowsHTML+="</td>";
					if(update)
					{
						rowsHTML+="<td data-th='Action'>";
						if(result.status=='submitted')
							rowsHTML+="<button type='button' class='btn blue' onclick='questionnaire_reviewed("+result.id+");'>Review</button>";
						else if(result.status=='reviewed')
							rowsHTML+="<button type='button' class='btn yellow' onclick='questionnaire_approved("+result.id+");'>Approve</button>";
						rowsHTML+="</td>";
					}
					else{
						rowsHTML+="<td></td>";
					}
			rowsHTML+="</tr>";

			$(tbody).append(rowsHTML);

		});
		paginator.update_index(questionnaires.length);
		hide_loader();
	});
}


function filled_questionnaires(struct_id,ques_name,ques_id,submitter,sub_date)
{
	var fields_data={data_store:'ques_fields',
						indexes:[{index:'id'},
									{index:'ques_id',exact:struct_id},
									{index:'name'},
									{index:'display_name'},
									{index:'description'},
									{index:'type'},
									{index:'fvalues'},
									{index:'weight'},
									{index:'dynamic_values'},
									{index:'fcol'},
									{index:'forder'},
									{index:'freq'}]};

	read_json_rows('',fields_data,function(fields)
	{
		var field_value_data={data_store:'ques_fields_data',
									indexes:[{index:'id'},{index:'ques_id',exact:ques_id},{index:'field_id'},{index:'field_value'}]};

		read_json_rows('',field_value_data,function(field_values)
		{
			var content="<form id='"+ques_name+"_ques_header'>"+
							"<fieldset>"+
								"<input type='hidden' value='"+ques_id+"'>"+
								"<div class='row'>"+
									"<div class='col-md-4 col-sm-4'><b>Submitter</b></div>"+
									"<div class='col-md-8 col-sm-8'><input type='text' value='"+submitter+"' readonly='readonly'></div>"+
								"</div>"+
								"<div class='row'>"+
									"<div class='col-md-4 col-sm-4'><b>Submission Date</b></div>"+
									"<div class='col-md-8 col-sm-8'><input type='text' value='"+get_my_past_date(sub_date)+"' readonly='readonly'></div>"+
								"</div>"+
							"</fieldset></form>"+
							"<form autocomplete='off' id='"+ques_name+"_ques_main'><fieldset>";

			fields.sort(function(a,b)
			{
				if(parseInt(a.forder)>parseInt(b.forder))
				{	return 1;}
				else
				{	return -1;}
			});

			fields.forEach(function(field)
			{
				var field_value="";
				for(var i in field_values)
				{
					if(field_values[i].field_id==field.id)
					{
						field_value=field_values[i].field_value;
						break;
					}
				}
				var fcol=":";
				var field_desc="";
				if(field.description!="" && field.description!=null)
				{
					field_desc=" ("+field.description+")";
				}

				switch(field.type)
				{
					case 'text':
					case 'number':
					case 'value list':
					case 'dynamic value list':	content+="<div class='row' title='"+field_desc+"'>"+
													"<div class='col-md-4 col-sm-4'><b>"+field.display_name+"</b></div>"+
													"<div class='col-md-8 col-sm-8'><input readonly='readonly' value='"+field_value+"' type='text'></div>"+
												"</div>";
								break;
					case 'textarea':	content+="<div class='row' title='"+field_desc+"'>"+
													"<div class='col-md-4 col-sm-4'><b>"+field.display_name+"</b></div>"+
													"<div class='col-md-8 col-sm-8'><textarea readonly='readonly'>"+field_value+"</textarea></div>"+
												"</div>";
								break;
				}
			});
			content+="</fieldset></form>";
			$("#"+ques_name+" .portlet-body").html(content);
		});
	});
}

function questionnaire_reviewed(id)
{
	var last_updated=get_my_time();
	var status_element=document.getElementById('ques_status_'+id);
	status_element.innerHTML='reviewed';
	var ques_json={data_store:'ques_data',
	 				data:[{index:'id',value:id},
	 					{index:'status',value:'reviewed'},
	 					{index:'rev_date',value:last_updated},
	 					{index:'last_updated',value:last_updated}]};
	update_json(ques_json);
}

function questionnaire_approved(id)
{
	var last_updated=get_my_time();
	var status_element=document.getElementById('ques_status_'+id);
	status_element.innerHTML='approved';
	var ques_json={data_store:'ques_data',
	 				data:[{index:'id',value:id},
	 					{index:'status',value:'approved'},
	 					{index:'app_date',value:last_updated},
	 					{index:'last_updated',value:last_updated}]};
	update_json(ques_json);
}
