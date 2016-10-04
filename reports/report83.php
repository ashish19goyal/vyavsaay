<div id='report83' class='tab-pane'>
	<form id='report83_header' autocomplete="off">
		<fieldset>
			<label>Test ID<br><input type='text' name='test'></label>
			<label>Item<br><input type='text' name='name'></label>
			<label>Result<br><input type='text' name='result'></label>
			<label>
				<input type='submit' value='Refresh' class='generic_icon'>
				<input type='button' title='Print' class='print_icon'>
			</label>	
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<th>Test ID</th>
				<th>Item</th>
				<th>Result</th>
				<th>Details</th>
				<th>Documents</th>
			</tr>
		</thead>
		<tbody id='report83_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='report83_prev' class='prev_icon' data-index='-25' onclick="$('#report83_index').attr('data-index',$(this).attr('data-index')); report83_ini();">
		<div style='display:hidden;' id='report83_index' data-index='0'></div>
		<img src='./images/next.png' id='report83_next' class='next_icon' data-index='25' onclick="$('#report83_index').attr('data-index',$(this).attr('data-index')); report83_ini();">
	</div>
	
	<script>

function report83_header_ini()
{	
	var form=document.getElementById('report83_header');
	var test_filter=form.elements['test'];
	var name_filter=form.elements['name'];
	var result_filter=form.elements['result'];
	
	$(form).off('submit');
	$(form).on('submit',function(event)
	{
		event.preventDefault();
		report83_ini();
	});
			
	var name_data="<product_master>"+
				"<name></name>"+
				"</product_master>";
	set_my_filter(name_data,name_filter);
	
	var test_data="<testing_process>"+
				"<test_id></test_id>"+
				"</testing_process>";
	set_my_filter(test_data,test_filter);
	
	set_static_filter('testing_results','response',result_filter);
	
	var prev_element=document.getElementById('report83_prev');
	var next_element=document.getElementById('report83_next');
	
	$(prev_element).hide();
	$(next_element).hide();	
}

function report83_ini()
{
	var form=document.getElementById('report83_header');
	var test_filter=form.elements['test'].value;
	var item_filter=form.elements['name'].value;
	var result_filter=form.elements['result'].value;
	
	show_loader();
	
	$('#report83_body').html('');
	
	////indexing///
	var index_element=document.getElementById('report83_index');
	var prev_element=document.getElementById('report83_prev');
	var next_element=document.getElementById('report83_next');
	var start_index=index_element.getAttribute('data-index');
	//////////////
		
	var testing_data="<testing_results count='25' start_index='"+start_index+"'>"+
			"<item>"+item_filter+"</item>"+
			"<test_id>"+test_filter+"</test_id>"+
			"<date></date>"+
			"<response>"+result_filter+"</response>"+
			"<details></details>"+
			"<next_date></next_date>"+
			"</testing_results>";	
						
	fetch_requested_data('report83',testing_data,function(tests)
	{
		tests.forEach(function(test_item) 
		{
			var rowsHTML="<tr>";
			rowsHTML+="<td data-th='Test Id'>";
				rowsHTML+=test_item.test_id;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+=test_item.item;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Result'>";
				rowsHTML+=get_my_past_date(test_item.date)+": "+test_item.response;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Details'>";
				rowsHTML+=test_item.details;
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Document' id='report83_document_"+test_item.id+"'>";			
			rowsHTML+="</td>";
			rowsHTML+="</tr>";

			$('#report83_body').append(rowsHTML);
			
			var doc_column="<documents>" +
							"<id></id>" +
							"<url></url>" +
							"<doc_name></doc_name>"+
							"<doc_type exact='yes'>testing_results</doc_type>" +
							"<target_id exact='yes'>"+test_item.id+"</target_id>" +
							"</documents>";
			fetch_requested_data('report83',doc_column,function(doc_results)
			{
				var docHTML="";
				for (var j in doc_results)
				{
					var updated_url=doc_results[j].url.replace(/ /g,"+");
					docHTML+="<a href='"+updated_url+"' download='"+doc_results[j].doc_name+"'><u>"+doc_results[j].doc_name+"</u></a><br>";							
				}
				document.getElementById('report83_document_'+test_item.id).innerHTML=docHTML;
			});
		});
		
		////indexing///
		var next_index=parseInt(start_index)+25;
		var prev_index=parseInt(start_index)-25;
		next_element.setAttribute('data-index',next_index);
		prev_element.setAttribute('data-index',prev_index);
		index_element.setAttribute('data-index','0');
		if(tests.length<25)
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
	
	var print_button=form.elements[5];
	print_tabular_report('report83','Testing Results',print_button);
};
	
	</script>
</div>