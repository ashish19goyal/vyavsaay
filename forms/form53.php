<div id='form53' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form53_header'></form>
					<th>Bill Number <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form53_header'></th>
					<th>Supplier <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form53_header'></th>
					<th>Bill Date</th>
					<th>Total (in Rs.)</th>
					<th>Notes</th>
					<th><input type="button" titel='Enter new bill' form='form53_header' class='add_icon' onclick="element_display('','form21'); form21_new_form();">
						<input type='button' form='form53_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form53_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form53_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form53_prev' class='prev_icon' data-index='-25' onclick="$('#form53_index').attr('data-index',$(this).attr('data-index')); form53_ini();">
		<div style='display:hidden;' id='form53_index' data-index='0'></div>
		<img src='./images/next.png' id='form53_next' class='next_icon' data-index='25' onclick="$('#form53_index').attr('data-index',$(this).attr('data-index')); form53_ini();">
	</div>
</div>