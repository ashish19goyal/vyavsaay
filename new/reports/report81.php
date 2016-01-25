<div id='report81' class='tab-pane'>
	<form id='report81_header' autocomplete="off">
		<fieldset>
			<label>Staff<br><input type='text' name='staff' required></label>
			<label>	
				<input type='submit' value='Refresh' class='generic_icon'>
				<input type='button' title='Print' class='print_icon'>
			</label>	
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<th>Customer</th>
				<th>Requirement</th>
				<th>Follow-ups</th>
				<th>Next Follow up</th>
			</tr>
		</thead>
		<tbody id='report81_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='report81_prev' class='prev_icon' data-index='-25' onclick="$('#report81_index').attr('data-index',$(this).attr('data-index')); report81_ini();">
		<div style='display:hidden;' id='report81_index' data-index='0'></div>
		<img src='./images/next.png' id='report81_next' class='next_icon' data-index='25' onclick="$('#report81_index').attr('data-index',$(this).attr('data-index')); report81_ini();">
	</div>
	
	<script>

function report81_header_ini()
{	
	var form=document.getElementById('report81_header');
	var staff_filter=form.elements['staff'];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report81_ini();
	});
			
	var staff_data="<staff>"+
				"<acc_name></acc_name>"+
				"</staff>";
	set_my_filter(staff_data,staff_filter);
}

function report81_ini()
{
	var form=document.getElementById('report81_header');
	var staff_filter=form.elements[1].value;
	
	show_loader();
	$('#report81_body').html('');	
	
	////indexing///
	var index_element=document.getElementById('report81_index');
	var prev_element=document.getElementById('report81_prev');
	var next_element=document.getElementById('report81_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////

	var leads_data="<sale_leads count='25' start_index='"+start_index+"'>" +
		"<id></id>"+
		"<customer></customer>" +
		"<detail></detail>"+
		"<due_date></due_date>"+
		"<identified_by>"+staff_filter+"</identified_by>"+
		"</sale_leads>";
	//console.log(orders_data);
	
	fetch_requested_data('report81',leads_data,function(items)
	{
		items.forEach(function(item)
		{
			var rowsHTML="";
			rowsHTML+="<tr>";
			rowsHTML+="<form id='report81_"+item.id+"'></form>";
			rowsHTML+="<td data-th='Customer'>";
				rowsHTML+=item.customer;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Requirement'>";
				rowsHTML+=item.detail;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Follow-ups' id='report81_followup_"+item.id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Next Follow-up'>";
				rowsHTML+=get_my_past_date(item.due_date);
			rowsHTML+="</td>";
			rowsHTML+="</tr>";
		
			$('#report81_body').append(rowsHTML);
			
			var followup_xml="<followups>"+
							"<response></response>"+
							"<detail></detail>"+
							"<date></date>"+
							"<source_id exact='yes'>"+item.id+"</source_id>"+
							"</followups>";
			fetch_requested_data('',followup_xml,function (followups) 
			{
				var follow_up_td=document.getElementById('report81_followup_'+item.id);
				var followup_data="";
				for(var i in followups)
				{
					followup_data+="<p title='Response: "+followups[i].response+"\nDetail: "+followups[i].detail+"'>"+get_my_past_date(followups[i].date)+"</p>";
				}
				follow_up_td.innerHTML=followup_data;
			});				
		});		
		
		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(items.length<25)
		{
			$(next_element).hide();
		}
		else
		{
			$(next_element).show();
		}
		if(prev_index<0)
		{
			$(prev_element).hide();
		}
		else
		{
			$(prev_element).show();
		}
		/////////////

		hide_loader();
	});
	
	var print_button=form.elements[3];
	print_tabular_report('report81','Sale Leads managed by '+staff_filter,print_button);
};
	
	</script>
</div>