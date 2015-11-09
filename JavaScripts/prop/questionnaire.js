function add_questionnaires(func)
{
	var struct_data="<ques_struct>"+
					"<id></id>"+
					"<name></name>"+
					"<display_name></display_name>"+
					"<func></func>"+
					"<status exact='yes'>active</status>"+										
					"</ques_struct>";
	fetch_requested_data('',struct_data,function(structs)
	{
		structs.forEach(function(struct)
		{
			if(is_create_access(struct.name))
			{
				var link="<li><a id='"+struct.name+"_link' href='#"+struct.name+"' onclick=\"initialize_questionnaires('"+struct.id+"','"+struct.name+"');\">"+struct.display_name+"</a></li>";	
				var content="<div id='"+struct.name+"' class='function_detail'></div>";
				var func_element=$("#"+struct.func+"_main");
				//console.log(func_element);			
				$("#"+struct.func+"_main").append(content);			
				$("#"+struct.func+"_main").find('ul').first().append(link);
				$('#'+struct.name+'_link').on('click',function () 
				{
					initialize_questionnaires(struct.id,struct.name);
				});
			}
		});
		func();
	});
}


function initialize_questionnaires(id,ques_name)
{
	var fields_data="<ques_fields>"+
					"<id></id>"+
					"<ques_id exact='yes'>"+id+"</ques_id>"+
					"<name></name>"+
					"<display_name></display_name>"+
					"<description></description>"+					
					"<type></type>"+
					"<fvalues></fvalues>"+
					"<weight></weight>"+
					"<dynamic_values></dynamic_values>"+
					"<fcol></fcol>"+
					"<forder></forder>"+
					"<freq></freq>"+
					"</ques_fields>";
	fetch_requested_data('',fields_data,function(fields)
	{
		var content="<form id='"+ques_name+"_ques_header'><fieldset>";
		content+="<label><b>Questionnaire Id</b><br><input type='text' readonly='readonly'></label><label><b>Submitter</b><br><input type='text' readonly='readonly'></label><label><b>Submission Date</b><br><input type='text' readonly='readonly'></label>";
		content+="<input type='button' value='Previous Submissions' class='generic_icon' onclick=\"previous_questionnaires('"+id+"','"+ques_name+"',0);\"></fieldset></form>"+
				"<form class='questionnaire_form' autocomplete='off' id='"+ques_name+"_ques_main'><fieldset>";

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
				
		fields.forEach(function(field)
		{
			var required='';
			if(field.freq=='checked')
				required='required';			
			var fcol=":";
			content+="<br>";
			var field_desc="";
			if(field.description!="" && field.description!=null)
			{
				field_desc=" ("+field.description+")";
			}

			switch(field.type)
			{
				case 'text':content+="<label>"+field.display_name+field_desc+fcol+" <input id='field"+id+"_"+field.id+"' data-weight='"+field.weight+"' type='text' "+required+"></label>";
							break;
				case 'number':content+="<label>"+field.display_name+field_desc+fcol+" <input id='field"+id+"_"+field.id+"' type='number' data-weight='"+field.weight+"' step='any' "+required+"></label>";
							break;
				case 'value list':content+="<label>"+field.display_name+field_desc+fcol+" <select id='field"+id+"_"+field.id+"' data-weight='"+field.weight+"' "+required+">";
								var values_array=field.fvalues.split(";");
								values_array.forEach(function(fvalue)
								{
									var kvp=fvalue.split(":");
									content+="<option value='"+kvp[1]+"'>"+kvp[0]+"</option>";
								});
								content+="</select></label>";
							break;
				case 'dynamic value list':content+="<label>"+field.display_name+field_desc+fcol+" <input id='field"+id+"_"+field.id+"' data-weight='"+field.weight+"' "+required+"></label>";
								var dynamic_field=new Object();
								dynamic_field.id=field.id;
								dynamic_field.dynamic_values=revert_htmlentities(field.dynamic_values).replace(/vyavsaay/g,"");
								dynamic_fields.push(dynamic_field);
							break;
				case 'textarea':content+="<label>"+field.display_name+field_desc+fcol+" <textarea id='field"+id+"_"+field.id+"' data-weight='"+field.weight+"' "+required+"></textarea></label>";
							break;
			}
			content+="<br>";
		});
		content+="<label><input type='submit' value='Submit' class='generic_icon'></label>";
		content+="</fieldset></form>";
		$("#"+ques_name).html(content);
		
		dynamic_fields.forEach(function (dynamic_field) 
		{
			var filter_element=document.getElementById('field'+id+'_'+dynamic_field.id);
			set_my_value_list(dynamic_field.dynamic_values,filter_element);
		});
		//function to submit the questionnaire
		var ques_form=document.getElementById(ques_name+"_ques_main");
		var reviewer_filter=ques_form.elements[1];
		var approver_filter=ques_form.elements[2];
		
		var submit_function="";

		var reviewer_data="<ques_struct count='1'>"+
						"<id>"+id+"</id>"+
						"<reviewer></reviewer>"+
						"<approver></approver>"+
						"<function_name></function_name>"+
						"<function_def></function_def>"+
						"</ques_struct>";
		fetch_requested_data('',reviewer_data,function(people)
		{
			if(people.length>0)
			{
				reviewer_filter.value=people[0].reviewer;
				approver_filter.value=people[0].approver;
				//var script_content="<script>"+people[0].function_def+"</script>";
				//$("#"+ques_name).append(script_content);
			}			
		});

		var ques_header=document.getElementById(ques_name+"_ques_header");
		ques_header.elements[1].value=get_new_key();
		ques_header.elements[2].value=get_account_name();
		ques_header.elements[3].value=get_my_date();
		
		$(ques_form).off('submit');
		$(ques_form).on('submit',function(event)
		{
			event.preventDefault();
			
			var data_id=ques_header.elements[1].value;
			var submitter=ques_header.elements[2].value;
			var sub_date=get_raw_time(ques_header.elements[3].value);
			var reviewer=ques_form.elements[1].value;
			var approver=ques_form.elements[2].value;
			var last_updated=get_my_time();
						
			var total_score=0;
			var total_weight=0;
			
			fields.forEach(function(field)
			{
				var field_value=document.getElementById("field"+id+"_"+field.id).value;
				var field_weight=document.getElementById("field"+id+"_"+field.id).getAttribute('data-weight');
				
				if(!isNaN(parseFloat(field_value)) && !isNaN(parseFloat(field_weight)))
				{
					total_score+=parseFloat(field_weight)*parseFloat(field_value);
					total_weight+=parseFloat(field_weight);
				}				
				var field_data_id=get_new_key();
				var field_data="<ques_fields_data>"+
						"<id>"+field_data_id+"</id>"+
						"<ques_id>"+data_id+"</ques_id>"+
						"<field_id>"+field.id+"</field_id>"+
						"<field_value>"+field_value+"</field_value>"+
						"<last_updated>"+last_updated+"</last_updated>"+
						"</ques_fields_data>";
				create_simple(field_data);				
			});

			var total_weighted_score=total_score/total_weight;
			
			var ques_data="<ques_data>"+
						"<id>"+data_id+"</id>"+
						"<ques_struct_id>"+id+"</ques_struct_id>"+
						"<submitter>"+submitter+"</submitter>"+
						"<reviewer>"+reviewer+"</reviewer>"+
						"<approver>"+approver+"</approver>"+
						"<sub_date>"+sub_date+"</sub_date>"+
						"<status>approved</status>"+
						"<total_score>"+total_weighted_score+"</total_score>"+
						"<last_updated>"+last_updated+"</last_updated>"+
						"</ques_data>";
			create_simple_func(ques_data,function () 
			{
					if(ques_name=='ques1')
					{
						ques1_submit_action(ques_form);
					}
					else if(ques_name=='ques2')
					{
						ques2_submit_action(ques_form);
					}
					else if(ques_name=='ques3')
					{
						ques3_submit_action(ques_form);
					}
			});
			$("#modal79").dialog("open");	
			
			initialize_questionnaires(id,ques_name);
		});		
	});
}

function previous_questionnaires(id,ques_name,start_index)
{
	show_loader();
	var ques_data="<ques_data count='25' start_index='"+start_index+"'>"+
				"<id></id>"+
				"<ques_struct_id exact='yes'>"+id+"</ques_struct_id>"+
				"<submitter></submitter>"+
				"<status></status>"+
				"<sub_date></sub_date>"+
				"</ques_data>";

	if_data_read_access('ques_data',function(accessible_data)
	{
		fetch_requested_data('',ques_data,function(questionnaires)
		{
			var next_index=parseInt(start_index)+25;
			var prev_index=parseInt(start_index)-25;
			var content="<table class='rwd-table'>"+
						"<thead><tr>"+
						"<th>Id</th>"+
						"<th>Submitter</th>"+
						"<th>Submission Date</th>"+
						"<th>Status</th>"+
						"<th>Action</th>"+
						"</tr></thead><tbody id='"+ques_name+"_body'></tbody></table>"+
						"<div class='form_nav'>"+
						"<img src='./images/previous.png' id='"+ques_name+"_prev' class='prev_icon' onclick=onclick=\"previous_questionnaires('"+id+"','"+ques_name+"',"+prev_index+");\">"+
						"<img src='./images/next.png' id='"+ques_name+"_next' class='next_icon' onclick=onclick=\"previous_questionnaires('"+id+"','"+ques_name+"',"+next_index+");\">"+
						"</div>";

			$("#"+ques_name).html(content);
			var tbody=document.getElementById(ques_name+'_body');
			var next_element=document.getElementById(ques_name+'_next');
			var prev_element=document.getElementById(ques_name+'_prev');
	
			if(questionnaires.length<25)
			{
				$(next_element).hide();
			}
			else
			{
				$(next_element).show();
			}
			if(start_index<1)
			{
				$(prev_element).hide();
			}
			else
			{
				$(prev_element).show();
			}

			questionnaires.forEach(function(result)
			{
				var read=false;
				var update=false;
				var del=false;
				var access=false;
				for(var x in accessible_data)
				{
					if(accessible_data[x].record_id===result.id || accessible_data[x].record_id=='all')
					{
						if(accessible_data[x].criteria_field=="" || accessible_data[x].criteria_field== null || result[accessible_data[x].criteria_field]==accessible_data[x].criteria_value)
						{
							if(accessible_data[x].access_type=='all')
							{
								read=true;
								update=true;
								del=true;
								access=true;
								break;
							}
							else if(accessible_data[x].access_type=='read')
							{
								read=true;
							}
							else if(accessible_data[x].access_type=='delete')
							{
								del=true;
							}
							else if(accessible_data[x].access_type=='update')
							{
								update=true;
							}
						}
					}
				}
				
				if(read)
				{
					var rowsHTML="<tr>";
						rowsHTML+="<form id='ques_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Id'>";
								rowsHTML+="<a style='cursor: pointer;text-decoration: underline;' onclick=\"filled_questionnaires('"+id+"','"+ques_name+"','"+result.id+"','"+result.submitter+"','"+result.sub_date+"')\">"+result.id+"</a>";
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
									rowsHTML+="<input type='button' class='generic_icon' value='Review' onclick='questionnaire_reviewed("+result.id+");'>";
								else if(result.status=='reviewed')								
									rowsHTML+="<input type='button' class='generic_icon' value='Approve' onclick='questionnaire_approved("+result.id+");'>";
								rowsHTML+="</td>";						
							}
							else{
								rowsHTML+="<td></td>";						
							}
					rowsHTML+="</tr>";
					
					$(tbody).append(rowsHTML);
				}
			});

			hide_loader();
		});
	});
}

function questionnaire_reviewed(id)
{
	var last_updated=get_my_time();
	var status_element=document.getElementById('ques_status_'+id);
	status_element.innerHTML='reviewed';
	var ques_xml="<ques_data>"+
					"<id>"+id+"</id>"+
					"<status>reviewed</status>"+
					"<rev_date>"+last_updated+"</rev_date>"+
					"<last_updated>"+last_updated+"</last_updated>"+
					"</ques_data>";
	update_simple(ques_xml);	
}

function questionnaire_approved(id)
{
	var last_updated=get_my_time();
	var status_element=document.getElementById('ques_status_'+id);
	status_element.innerHTML='approved';
	var ques_xml="<ques_data>"+
					"<id>"+id+"</id>"+
					"<status>approved</status>"+
					"<rev_date>"+last_updated+"</rev_date>"+
					"<last_updated>"+last_updated+"</last_updated>"+
					"</ques_data>";
	update_simple(ques_xml);
			
}


function filled_questionnaires(struct_id,ques_name,ques_id,submitter,sub_date)
{
	var fields_data="<ques_fields>"+
					"<id></id>"+
					"<ques_id exact='yes'>"+struct_id+"</ques_id>"+
					"<name></name>"+
					"<display_name></display_name>"+
					"<description></description>"+					
					"<type></type>"+
					"<fvalues></fvalues>"+
					"<weight></weight>"+
					"<dynamic_values></dynamic_values>"+
					"<fcol></fcol>"+
					"<forder></forder>"+
					"<freq></freq>"+
					"</ques_fields>";
	fetch_requested_data('',fields_data,function(fields)
	{
		var field_value_data="<ques_fields_data>"+
							"<id></id>"+
							"<ques_id exact='yes'>"+ques_id+"</ques_id>"+
							"<field_id></field_id>"+
							"<field_value></field_value>"+
							"</ques_fields_data>";

		fetch_requested_data('',field_value_data,function(field_values)
		{
			var content="<form id='"+ques_name+"_ques_header'><fieldset>";
			content+="<label><b>Questionnaire Id</b><br><input type='text' value='"+ques_id+"' readonly='readonly'></label>"+
					"<label><b>Submitter</b><br><input type='text' value='"+submitter+"' readonly='readonly'></label>"+
					"<label><b>Submission Date</b><br><input type='text' value='"+get_my_past_date(sub_date)+"' readonly='readonly'></label>";
			content+="<input type='button' value='Previous Submissions' class='generic_icon' onclick=\"previous_questionnaires('"+struct_id+"','"+ques_name+"',0);\"></fieldset></form>"+
					"<form class='questionnaire_form' id='"+ques_name+"_ques_main'><fieldset>";
	
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
				content+="<br>";
				var field_desc="";
				if(field.description!="" && field.description!=null)
				{
					field_desc=" ("+field.description+")";
				}
				
				switch(field.type)
				{
					case 'text':content+="<label>"+field.display_name+field_desc+fcol+" <input value='"+field_value+"' type='text' readonly='readonly'></label>";
								break;
					case 'number':content+="<label>"+field.display_name+field_desc+fcol+" <input value='"+field_value+"' type='number' readonly='readonly'></label>";
								break;
					case 'value list':content+="<label>"+field.display_name+field_desc+fcol+" <input type='text' value='"+field_value+"' readonly='readonly'></label>";
								break;
					case 'textarea':content+="<label>"+field.display_name+field_desc+fcol+" <textarea readonly='readonly'>"+field_value+"</textarea></label>";
								break;
					case 'dynamic value list':content+="<label>"+field.display_name+field_desc+fcol+" <input type='text' value='"+field_value+"'></label>";
								break;			
				}
			});
			content+="</fieldset></form>";
			$("#"+ques_name).html(content);			
		});		
	});
}

/*Project prioritization*/
function ques1_submit_action(ques_form)
{
	var project=ques_form.elements[3].value;
	var project_field_id=ques_form.elements[3].id;
	var field_ids=project_field_id.split("_");
	var field_id=field_ids[1];

	var ques_fields_data="<ques_fields_data>"+
						"<ques_id></ques_id>"+
						"<field_id exact='yes'>"+field_id+"</field_id>"+
						"<field_value exact='yes'>"+project+"</field_value>"+
						"</ques_fields_data>";
	fetch_requested_data('',ques_fields_data,function (ques_fields)
	{
		var id_array="--";
		for (var i in ques_fields)
		{
			id_array+=ques_fields[i].ques_id+"--";
		}

		var ques_data="<ques_data>"+
					"<total_score></total_score>"+
					"<id array='yes'>"+id_array+"</id>"+
					"</ques_data>";
		fetch_requested_data('',ques_data,function(quess)
		{
			var total_count=quess.length;
			var total_score=0;

			for (var j in quess)
			{
				total_score+=parseFloat(quess[j].total_score);
			}
			
			var avg_score=0;			
			if(total_count>0)
			{
				avg_score=Math.round(total_score/total_count);
			}
			
			var project_data="<projects>"+
				"<id></id>"+
				"<name exact='yes'>"+project+"</name>"+
				"</projects>";
			get_single_column_data(function(pos)
			{
				if(pos.length>0)
				{
					var project_xml="<projects>"+
							"<id>"+pos[0]+"</id>"+
							"<priority>"+avg_score+"</priority>"+
							"<last_updated>"+get_my_time()+"</last_updated>"+
							"</projects>";
					if(is_online())
					{	
						server_update_simple(project_xml);
					}
					else
					{
						local_update_simple(project_xml);
					}		
				}
			},project_data);
		});
	});	
}


/*supplier prioritization*/
function ques2_submit_action(ques_form)
{
	var supplier=ques_form.elements[3].value;
	var supplier_field_id=ques_form.elements[3].id;
	var field_ids=supplier_field_id.split("_");
	var field_id=field_ids[1];

	var ques_fields_data="<ques_fields_data>"+
						"<ques_id></ques_id>"+
						"<field_id exact='yes'>"+field_id+"</field_id>"+
						"<field_value exact='yes'>"+supplier+"</field_value>"+
						"</ques_fields_data>";
	fetch_requested_data('',ques_fields_data,function (ques_fields)
	{
		var id_array="--";
		for (var i in ques_fields)
		{
			id_array+=ques_fields[i].ques_id+"--";
		}

		var ques_data="<ques_data>"+
					"<total_score></total_score>"+
					"<id array='yes'>"+id_array+"</id>"+
					"</ques_data>";
		fetch_requested_data('',ques_data,function(quess)
		{
			var total_count=quess.length;
			var total_score=0;

			for (var j in quess)
			{
				total_score+=parseFloat(quess[j].total_score);
			}
			
			var avg_score=0;			
			if(total_count>0)
			{
				avg_score=Math.round(total_score/total_count);
			}
			
			var po_data="<suppliers>"+
				"<id></id>"+
				"<acc_name exact='yes'>"+supplier+"</acc_name>"+
				"</suppliers>";
			get_single_column_data(function(pos)
			{
				if(pos.length>0)
				{
					var po_xml="<suppliers>"+
							"<id>"+pos[0]+"</id>"+
							"<score>"+avg_score+"</score>"+
							"<last_updated>"+get_my_time()+"</last_updated>"+
							"</suppliers>";
					if(is_online())
					{	
						server_update_simple(po_xml);
					}
					else
					{
						local_update_simple(po_xml);
					}		
				}
			},po_data);
		});
	});	
}

/*purchase order prioritization*/
function ques3_submit_action(ques_form)
{
	var po_num=ques_form.elements[3].value;
	var po_field_id=ques_form.elements[3].id;
	var field_ids=po_field_id.split("_");
	var field_id=field_ids[1];

	var ques_fields_data="<ques_fields_data>"+
						"<ques_id></ques_id>"+
						"<field_id exact='yes'>"+field_id+"</field_id>"+
						"<field_value exact='yes'>"+po_num+"</field_value>"+
						"</ques_fields_data>";
	fetch_requested_data('',ques_fields_data,function (ques_fields)
	{
		var id_array="--";
		for (var i in ques_fields)
		{
			id_array+=ques_fields[i].ques_id+"--";
		}

		var ques_data="<ques_data>"+
					"<total_score></total_score>"+
					"<id array='yes'>"+id_array+"</id>"+
					"</ques_data>";
		fetch_requested_data('',ques_data,function(quess)
		{
			var total_count=quess.length;
			var total_score=0;

			for (var j in quess)
			{
				total_score+=parseFloat(quess[j].total_score);
			}
			
			var avg_score=0;			
			if(total_count>0)
			{
				avg_score=Math.round(total_score/total_count);
			}
			
			var po_data="<purchase_orders>"+
				"<id></id>"+
				"<order_num exact='yes'>"+po_num+"</order_num>"+
				"</purchase_orders>";
			get_single_column_data(function(pos)
			{
				if(pos.length>0)
				{
					var po_xml="<purchase_orders>"+
							"<id>"+pos[0]+"</id>"+
							"<priority>"+avg_score+"</priority>"+
							"<last_updated>"+get_my_time()+"</last_updated>"+
							"</purchase_orders>";
					if(is_online())
					{	
						server_update_simple(po_xml);
					}
					else
					{
						local_update_simple(po_xml);
					}		
				}
			},po_data);
		});
	});			
}