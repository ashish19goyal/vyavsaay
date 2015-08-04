<div id='form213' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form213_header'></form>
					<th>Customer <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form213_header'></th>
					<th>Details </th>
					<th>Due Date</th>
					<th>Identified By <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form213_header'></th>
					<th><input type='button' form='form213_header' title='Add new' class='add_icon' onclick='form213_add_item();'>
						<input type='button' form='form213_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form213_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form213_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form213_prev' class='prev_icon' data-index='-25' onclick="$('#form213_index').attr('data-index',$(this).attr('data-index')); form213_ini();">
		<div style='display:hidden;' id='form213_index' data-index='0'></div>
		<img src='./images/next.png' id='form213_next' class='next_icon' data-index='25' onclick="$('#form213_index').attr('data-index',$(this).attr('data-index')); form213_ini();">
	</div>
</div>