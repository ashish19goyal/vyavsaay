<div id='report41' class='tab-pane'>
	<form id='report41_header' autocomplete="off">
		<fieldset>
			<label>Service Name <input type='text' title='If this field is left blank, pre-requisites for all services will be shown'></label>
			<label>
				<input type='submit' value='Refresh' class='generic_icon'>
				<input type='button' title='Print' class='print_icon'>
			</label>	
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<th>Service Name</th>
				<th>Required sub products</th>
				<th>Required services</th>
				<th>Required tasks</th>
			</tr>
		</thead>
		<tbody id='report41_body'>
		</tbody>
	</table>
	
	<script>
function report41_header_ini()
{	
	var form=document.getElementById('report41_header');
	var service_filter=form.elements[1];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report41_ini();
	});

	var service_data="<services>" +
			"<name></name>" +
			"</services>";
	set_my_filter(service_data,service_filter);
}

function report41_ini()
{
	show_loader();
	var form=document.getElementById('report41_header');
	var name=form.elements[1].value;
	
	$('#report41_body').html("");
	var rowsHTML="";
	
	var service_data="<services>" +
			"<name>"+name+"</name>" +
			"</services>";
	get_single_column_data(function(services)
	{	
		var services_string="--";
		for(var k in services)
		{
			services_string+=services[k]+"--";
		}
		
		var requisites_data="<pre_requisites>" +
				"<name array='yes'>"+services_string+"</name>" +
				"<type exact='yes'>service</type>" +
				"<requisite_type></requisite_type>" +
				"<requisite_name></requisite_name>" +
				"<quantity></quantity>" +
				"</pre_requisites>";
		
		fetch_requested_data('report41',requisites_data,function(requisites)
		{
			for (var j=0; j<requisites.length;j++)
			{
				var product_string='';
				var service_string='';
				var task_string='';

				if(requisites[j].requisite_type=='product')
					product_string+="<u title='"+requisites[j].quantity+"'>"+requisites[j].requisite_name+"</u>, ";
				else if(requisites[j].requisite_type=='service')
					service_string+="<u title='"+requisites[j].quantity+"'>"+requisites[j].requisite_name+"</u>, ";
				else if(requisites[j].requisite_type=='task')
					task_string+="<u title='"+requisites[j].quantity+"'>"+requisites[j].requisite_name+"</u>, ";

				var item_name=requisites[j].name;
				for(var i=j+1; i<requisites.length;i++)
				{
					if(item_name==requisites[i].name)
					{
						if(requisites[i].requisite_type=='product')
							product_string+="<u title='"+requisites[i].quantity+"'>"+requisites[i].requisite_name+"</u>, ";
						else if(requisites[i].requisite_type=='service')
							service_string+="<u title='"+requisites[i].quantity+"'>"+requisites[i].requisite_name+"</u>, ";
						else if(requisites[i].requisite_type=='task')
							task_string+="<u title='"+requisites[i].quantity+"'>"+requisites[i].requisite_name+"</u>, ";
						
						requisites.splice(i,1);
						j-=1;
					}
				}
				product_string=product_string.substr(0,(product_string.length-2));
				service_string=service_string.substr(0,(service_string.length-2));
				task_string=task_string.substr(0,(task_string.length-2));
				
				rowsHTML+="<tr>";
					rowsHTML+="<td data-th='Service Name'>";
						rowsHTML+=item_name;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Required Sub products'>";
						rowsHTML+=product_string;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Required Services'>";
						rowsHTML+=service_string;
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Required Tasks'>";
						rowsHTML+=task_string;
					rowsHTML+="</td>";
				rowsHTML+="</tr>";
			}
			$('#report41_body').html(rowsHTML);
			
			var print_button=form.elements[3];
			print_tabular_report('report41','Pre-requisites for Services',print_button);
			
			hide_loader();
		});	

	},service_data);
};
	
	</script>
</div>