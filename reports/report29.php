<div id='report29' class='tab-pane'>
	<form id='report29_header' autocomplete="off">
		<fieldset>
			<label>Product Name <input type='text' title='If this field is left blank, pre-requisites for all products will be shown'></label>
			<label>
				<input type='submit' value='Refresh' class='generic_icon'>
				<input type='button' title='Print' class='print_icon'>
			</label>	
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<th>Product Name</th>
				<th>Required sub products</th>
				<th>Required services</th>
				<th>Required tasks</th>
			</tr>
		</thead>
		<tbody id='report29_body'>
		</tbody>
	</table>
	
	<script>
	function report29_header_ini()
{	
	var form=document.getElementById('report29_header');
	var product_filter=form.elements[1];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report29_ini();
	});
	
	var product_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
	
	set_my_filter(product_data,product_filter);
}

function report29_ini()
{
	show_loader();
	var form=document.getElementById('report29_header');
	var name=form.elements[1].value;
	
	$('#report29_body').html("");
	var rowsHTML="";
	
	var product_data="<product_master>" +
			"<name>"+name+"</name>" +
			"</product_master>";

	get_single_column_data(function(products)
	{	
		var products_string="--";
		for(var k in products)
		{
			products_string+=products[k]+"--";
		}
		
		var requisites_data="<pre_requisites>" +
				"<name array='yes'>"+products_string+"</name>" +
				"<type exact='yes'>product</type>" +
				"<requisite_type></requisite_type>" +
				"<requisite_name></requisite_name>" +
				"<quantity></quantity>" +
				"</pre_requisites>";
		
		fetch_requested_data('report29',requisites_data,function(requisites)
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
					rowsHTML+="<td data-th='Product Name'>";
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
			$('#report29_body').html(rowsHTML);
			
			var print_button=form.elements[3];
			print_tabular_report('report29','Pre-requisites for products',print_button);
			
			hide_loader();
		});	
	},product_data);
};

	</script>
</div>