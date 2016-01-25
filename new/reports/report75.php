<div id='report75' class='tab-pane'>
	<form id='report75_header' autocomplete="off">
		<fieldset>
			<label>Supplier<br><input type='text' name='supplier' required></label>
			<label>
				<input type='submit' value='Refresh' name='refresh' class='generic_icon'>
				<input type='button' title='Print' class='print_icon'>
			</label>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<th>Parameter</th>
				<th>Weight</th>
				<th>Score (out of 100)</th>
			</tr>
		</thead>
		<tbody id='report75_body'>
		</tbody>
		<tfoot id='report75_foot'>
		</tfoot>
	</table>
	
	<script>

function report75_header_ini()
{	
	var form=document.getElementById('report75_header');
	var supplier_filter=form.elements['supplier'];
	var refresh_button=form.elements['refresh'];	
	
	var supplier_data="<suppliers>" +
			"<acc_name></acc_name>" +
			"</suppliers>";
	set_my_filter(supplier_data,supplier_filter);
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report75_ini();
	});
}

function report75_ini()
{
	show_loader();
	
	var form=document.getElementById('report75_header');
	var supplier=form.elements['supplier'].value;
	
	$('#report75_body').html("");
	$('#report75_foot').html("");
	
	var struct_data="<ques_struct>" +
			"<id></id>"+			
			"<name exact='yes'>ques2</name>"+			
			"</ques_struct>";

	fetch_requested_data('report75',struct_data,function(structs)
	{
		if(structs.length>0)
		{
			var fields_data="<ques_fields>"+
						"<id></id>"+
						"<ques_id exact='yes'>"+structs[0].id+"</ques_id>"+
						"<name></name>"+
						"<display_name></display_name>"+
						"<description></description>"+
						"<weight></weight>"+
						"<forder></forder>"+
						"</ques_fields>";
			fetch_requested_data('report75',fields_data,function (fields) 
			{
				fields.sort(function(a,b)
				{
					if(parseInt(a.forder)>parseInt(b.forder))
					{	return 1;}
					else 
					{	return -1;}
				});
				
				var matching_ques=[];
				var fields_timer_count=0;
				
				fields.forEach(function (field) 
				{
					var report_timer=setInterval(function()
					{
				  	   if(fields_timer_count===0)
				  	   {
				  	   		fields_timer_count+=1;
				  			clearInterval(report_timer);
				  		   
							var rowsHTML="<tr>";
								rowsHTML+="<td data-th='Parameter'>";
									rowsHTML+=field.display_name;
								rowsHTML+="</td>";
								rowsHTML+="<td data-th='Weight'>";
									rowsHTML+=field.weight;
								rowsHTML+="</td>";
								rowsHTML+="<td data-th='Score (out of 100)' id='report75_score_"+field.id+"'>";
								rowsHTML+="</td>";
							rowsHTML+="</tr>";
							
							$('#report75_body').append(rowsHTML);
				
							var field_value_data="<ques_fields_data>"+
												"<ques_id></ques_id>"+
												"<field_value></field_value>"+
												"<field_id exact='yes'>"+field.id+"</field_id>"+
												"</ques_fields_data>";
							fetch_requested_data('',field_value_data,function (field_values) 
							{
								if(matching_ques.length==0)
								{
									for(var i=0;i<field_values.length;i++)
									{
										if(field_values[i].field_value==supplier)
										{
											matching_ques.push(field_values[i].ques_id);
										}
									}
									document.getElementById("report75_score_"+field.id).innerHTML=supplier;							
								}
								else
								{
									var total_value=0;
									var total_count=0;
									for(var j=0;j<field_values.length;j++)
									{
										if(matching_ques.indexOf(field_values[j].ques_id)>-1)
										{
											total_value+=parseFloat(field_values[j].field_value);
											total_count+=1;
										}
									}
									var field_score=Math.round(total_value/total_count);
									document.getElementById("report75_score_"+field.id).innerHTML=field_score;
								}
								fields_timer_count-=1;

								var total_score=0;
								var total_weight=0;								
								fields.forEach(function (total_field)
								{
									var score_td=document.getElementById("report75_score_"+total_field.id);
									if(!isNaN(parseFloat(score_td.innerHTML)))
									{									
										total_score+=(parseFloat(score_td.innerHTML)*parseFloat(total_field.weight));
										total_weight+=parseFloat(total_field.weight);
									}
								});
								var weighted_score=Math.round(total_score/total_weight);
								var footHTML="<tr><td colspan='2'>Total Score</td><td>"+weighted_score+"</td></tr>";
								$('#report75_foot').html(footHTML);
				
							});
					   }
				    },100);
						
				});
				
				var print_button=form.elements[5];
				print_tabular_report('report75','Feedback',print_button);
				
				hide_loader();
			});			
		}
		else 
		{
			hide_loader();
		}		
	});	
};
	
	</script>
</div>