<div id='form252' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form252_header'></form>
					<th>Customer <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form252_header'></th>
					<th>Details </th>
					<th>Due Date</th>
					<th>Identified By <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form252_header'></th>
					<th><input type='button' form='form252_header' title='Add new' class='add_icon' onclick='form252_add_item();'>
						<input type='button' form='form252_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form252_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form252_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form252_prev' class='prev_icon' data-index='-25' onclick="$('#form252_index').attr('data-index',$(this).attr('data-index')); form252_ini();">
		<div style='display:hidden;' id='form252_index' data-index='0'></div>
		<img src='./images/next.png' id='form252_next' class='next_icon' data-index='25' onclick="$('#form252_index').attr('data-index',$(this).attr('data-index')); form252_ini();">
	</div>
</div>