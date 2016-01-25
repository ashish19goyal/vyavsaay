<div id='report44' class='tab-pane'>
	<form id='report44_header' autocomplete="off">
		<fieldset>
			<label>Keywords <input type='text' required title='specify more keywords for better match (limited to a max of 7 words)'></label>
			<label>
				<input type='submit' value='Search' class='generic_icon'>
				<input type='button' title='Print' class='print_icon'>
			</label>	
		</fieldset>
	</form>
	<br/>
	<table class='rwd-table'>
		<thead>
			<tr>
				<th>Product Name</th>
				<th>Description</th>
				<th>Picture</th>
				<th>Price</th>
				<th>Link</th>
			</tr>
		</thead>
		<tbody id='report44_body'>
		</tbody>
	</table>
	
	<script>

function report44_header_ini()
{	
	var form=document.getElementById('report44_header');
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report44_ini();
	});

	$('#report44_body').html("");
}

function report44_ini()
{
	var form=document.getElementById('report44_header');
	var product_name=form.elements[1].value;
	
	show_loader();
	$('#report44_body').html("");
	
	ajax_with_custom_func("./ajax/ecommerce_products.php",{keywords:product_name,max_results:10},function(e)
	{
		var row=e.responseXML.childNodes[0].childNodes;
		for(var i=0; i<row.length; i++)
		{
			if(row[i].nodeName!="" && row[i].nodeName!="#text")
			{
				var data=row[i].childNodes;
				var rowsHTML="<tr>";
						rowsHTML+="<td data-th='Product Name'>";
							rowsHTML+=data[0].innerHTML;
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Description'>";
							rowsHTML+=data[1].innerHTML.substr(0,200);
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Picture'>";
							rowsHTML+="<img src='"+data[2].innerHTML+"'>";
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Price'>";
							rowsHTML+="Rs. "+data[3].innerHTML;
						rowsHTML+="</td>";
						rowsHTML+="<td data-th='Link'>";
							rowsHTML+="<a href='"+data[4].innerHTML+"' target='_blank'>Go to <b>"+data[5].innerHTML+"</b></a>";
						rowsHTML+="</td>";			
				rowsHTML+="</tr>";
				
				$('#report44_body').prepend(rowsHTML);			
			}
		}
		
		var print_button=form.elements[3];
		print_tabular_report('report44','Compare Product Prices',print_button);
				
		hide_loader();
	});
};
	
	</script>
</div>