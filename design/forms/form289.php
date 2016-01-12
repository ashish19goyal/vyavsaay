<div id='form289' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form289_header'></form>
					<th>Customer <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form289_header'></th>
					<th>Item <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form289_header'></th>
					<th>PoC <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form289_header'></th>
					<th>Comments <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form289_header'></th>
					<th>Followup Date <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form289_header'></th>
					<th><input type='button' form='form289_header' title='Add new' class='add_icon' onclick='form289_add_item();'>
						<input type='button' form='form289_header' name='export' value='EXPORT' class='export_icon'>
						<input type='submit' form='form289_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form289_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form289_prev' class='prev_icon' data-index='-25' onclick="$('#form289_index').attr('data-index',$(this).attr('data-index')); form289_ini();">
		<div style='display:hidden;' id='form289_index' data-index='0'></div>
		<img src='./images/next.png' id='form289_next' class='next_icon' data-index='25' onclick="$('#form289_index').attr('data-index',$(this).attr('data-index')); form289_ini();">
	</div>
</div>