<div id='form292' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form292_header'></form>
					<th>Customer <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form292_header'></th>
					<th>Period</th>
					<th>Details <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form292_header'></th>
					<th>Amount</th>
					<th>Status <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form292_header'></th>
					<th><input type='button' form='form292_header' title='Add new' class='add_icon' onclick='form292_add_item();'>
						<input type='button' form='form292_header' value='EXPORT' name='export' class='export_icon'>
						<input type='submit' form='form292_header' style='display:none;visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form292_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form292_prev' class='prev_icon' data-index='-25' onclick="$('#form292_index').attr('data-index',$(this).attr('data-index')); form292_ini();">
		<div style='display:hidden;' id='form292_index' data-index='0'></div>
		<img src='./images/next.png' id='form292_next' class='next_icon' data-index='25' onclick="$('#form292_index').attr('data-index',$(this).attr('data-index')); form292_ini();">
	</div>
</div>