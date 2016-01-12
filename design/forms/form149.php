<div id='form149' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form149_header'></form>
					<th>Role <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form149_header'></th>
					<th>Username <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form149_header'></th>
					<th>Status <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form149_header'></th>
					<th><input type='button' form='form149_header' value='New mapping' class='add_icon' onclick='form149_add_item();'>
						<input type='button' form='form149_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form149_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form149_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form149_prev' class='prev_icon' data-index='-25' onclick="$('#form149_index').attr('data-index',$(this).attr('data-index')); form149_ini();">
		<div style='display:hidden;' id='form149_index' data-index='0'></div>
		<img src='./images/next.png' id='form149_next' class='next_icon' data-index='25' onclick="$('#form149_index').attr('data-index',$(this).attr('data-index')); form149_ini();">
	</div>
</div>