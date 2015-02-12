<div id='form81' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form81_header'></form>
					<th>Customer <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form81_header'></th>
					<th>Details </th>
					<th>Due Date</th>
					<th>Identified By </th>
					<th><input type='button' form='form81_header' title='Add new' class='add_icon' onclick='form81_add_item();'>
						<input type='button' form='form81_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form81_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form81_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form81_prev' class='prev_icon' data-index='-25' onclick="$('#form81_index').attr('data-index',$(this).attr('data-index')); form81_ini();">
		<div style='display:hidden;' id='form81_index' data-index='0'></div>
		<img src='./images/next.png' id='form81_next' class='next_icon' data-index='25' onclick="$('#form81_index').attr('data-index',$(this).attr('data-index')); form81_ini();">
	</div>
</div>