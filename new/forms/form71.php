<div id='form71' class='function_detail'>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form71_header'></form>
					<th>Name <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form71_header'></th>
					<th>Type <img src='../images/filter.png' class='filter_icon' onclick='show_filter($(this));'><input type='text' class='filter' form='form71_header'></th>
					<th>Description </th>
					<th>Balance </th>
					<th><input type='button' form='form71_header' value='Add new financial account' class='add_icon' onclick='modal12_action();'>
						<input type='button' form='form71_header' value='EXPORT' class='export_icon'>
						<input type='submit' form='form71_header' style='visibility: hidden;'>
					</th>
			</tr>
		</thead>
		<tbody id='form71_body'>
		</tbody>
	</table>
	<div class='form_nav'>
		<img src='./images/previous.png' id='form71_prev' class='prev_icon' data-index='-25' onclick="$('#form71_index').attr('data-index',$(this).attr('data-index')); form71_ini();">
		<div style='display:hidden;' id='form71_index' data-index='0'></div>
		<img src='./images/next.png' id='form71_next' class='next_icon' data-index='25' onclick="$('#form71_index').attr('data-index',$(this).attr('data-index')); form71_ini();">
	</div>
</div>