<div id='form84' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form84_header'></form>
					<th>Customer <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form84_header'></th>
					<th>Service <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form84_header'></th>
					<th>Status <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form84_header'></th>
					<th>Notes</th>
					<th>Last Bill</th>
					<th><input type='button' form='form84_header' title='Add subscription' class='add_icon' onclick='form84_add_item();'>
						<input type='button' form='form84_header' value='EXPORT' class='export_icon'>
						<input type='button' form='form84_header' title='Create due bills' value='Create Bills' class='generic_icon' onclick="form84_bills();">
						<input type='submit' form='form84_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form84_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form84_prev' class='prev_icon' data-index='-25' onclick="$('#form84_index').attr('data-index',$(this).attr('data-index')); form84_ini();">
		<div style='display:hidden;' id='form84_index' data-index='0'></div>
		<img src='./images/next.png' id='form84_next' class='next_icon' data-index='25' onclick="$('#form84_index').attr('data-index',$(this).attr('data-index')); form84_ini();">
	</div>
</div>