<div id='report95' class='tab-pane'>
	<form id='report95_header' autocomplete="off">
		<fieldset>
			<label style='background-color:#B93C42;color:#fff;padding:3px;'>AWB #<br><input type='text' style='color:#000;' required name='awb'></label>
			<input type='submit' class='submit_hidden'>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<th>AWB #</th>
				<th>Pincode</th>
				<th>Zone</th>
			</tr>
		</thead>
		<tbody id='report95_body'>
		</tbody>
	</table>
	
	<script>

function report95_header_ini()
{	
	var form=document.getElementById('report95_header');
	var awb_filter=form.elements['awb'];
	
	$('#report95_body').html('');

	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report95_ini();
	});

	$(awb_filter).focus(); 		
}

function report95_ini()
{
	show_loader();
	var form=document.getElementById('report95_header');
	var awb_filter=form.elements['awb'];
	var awb=awb_filter.value;

	var master_data="<logistics_orders count='1'>" +
			"<pincode></pincode>"+
			"<awb_num exact='yes'>"+awb+"</awb_num>" +
			"</logistics_orders>";
	get_single_column_data(function(awbs)
	{
		if(awbs.length>0)
		{
			var zone_data="<pincodes>"+
					"<zone></zone>"+
					"<status exact='yes'>active</status>"+
					"<pincode exact='yes'>"+awbs[0]+"</pincode>"+
					"</pincodes>";
			get_single_column_data(function(pincodes)
			{				
				if(pincodes.length>0)
				{
					var rowsHTML="<tr>";
						rowsHTML+="<td data-th='AWB #'>";
							rowsHTML+=awb;
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Pincode'>";
							rowsHTML+=awbs[0];
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Zone'>";
							rowsHTML+=pincodes[0];
						rowsHTML+="</td>";
					rowsHTML+="</tr>";
		
					$('#report95_body').prepend(rowsHTML);
				}
				else
				{
					$("#modal76_link").click();
				}
				awb_filter.value="";
				hide_loader();
			},zone_data);	
		}
		else 
		{
			$("#modal71_link").click();
			awb_filter.value="";
			hide_loader();
		}	  		   
	},master_data);
};
	
	</script>
</div>