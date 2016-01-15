<div id='form187' class='function_detail'>
	<table class='rwd-table sortable'>
		<thead>
			<tr>
				<form id='form187_header'></form>
					<th>Order </th>
					<th>Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form187_header'></th>
					<th>Details </th>
					<th>Status <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form187_header'></th>
					<th>
						<input type='button' form='form187_header' title='Add new step' class='add_icon' onclick='form187_add_item();'>
						<input type='button' form='form187_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form187_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form187_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form187_prev' class='prev_icon' data-index='-25' onclick="$('#form187_index').attr('data-index',$(this).attr('data-index')); form187_ini();">
		<div style='display:hidden;' id='form187_index' data-index='0'></div>
		<img src='./images/next.png' id='form187_next' class='next_icon' data-index='25' onclick="$('#form187_index').attr('data-index',$(this).attr('data-index')); form187_ini();">
	</div>
</div>