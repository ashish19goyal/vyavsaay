<div id='form271' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form271_header'></form>
					<th>Person <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form271_header'></th>
					<th>Date <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form271_header'></th>
					<th>Amount</th>
					<th>
						<input type='button' form='form271_header' name='add' class='add_icon' onclick='form271_add_item();'>
						<input type='button' form='form271_header' name='export' value='EXPORT' class='export_icon'>
						<input type='submit' form='form271_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form271_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form271_prev' class='prev_icon' data-index='-25' onclick="$('#form271_index').attr('data-index',$(this).attr('data-index')); form271_ini();">
		<div style='display:hidden;' id='form271_index' data-index='0'></div>
		<img src='./images/next.png' id='form271_next' class='next_icon' data-index='25' onclick="$('#form271_index').attr('data-index',$(this).attr('data-index')); form271_ini();">
	</div>
</div>